import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { InjectorModule } from '../../injector.module';
import { Component } from '@angular/core';

export const extensionsActionRouteKey = 'extensionsActionsKey';

export interface EndpointTypeExtension {
  type: string;
  label: string;
  authTypes: string[];
}

export interface StratosExtensionConfig {
  routes?: Route[];
}

// The different types of Tab
export enum StratosTabType {
  Application = 'appTabs',
  CloudFoundry = 'cfTabs',
  CloudFoundryOrg = 'cfOrgTabs',
  CloudFoundrySpace = 'cfSpaceTabs'
}

export interface StratosTabMetadata {
  type: StratosTabType;
  label: string;
  link: string;
}

// The different types of Action
export enum StratosActionType {
  Applications = 'appsActions',
  Application = 'appActions',
  CloudFoundry = 'cfActions',
  CloudFoundryOrg = 'cfOrgActions',
  CloudFoundrySpace = 'cfSpaceActions',
  Endpoints = 'endpointsActions'
}

export interface StratosActionMetadata {
  type: StratosActionType;
  label?: string;
  link: string;
  icon: string;
  iconFont?: string;
}

export type StratosRouteType = StratosTabType | StratosActionType;

/**
 * Decortator for a Tab extension
 */
export function StratosTab(props: StratosTabMetadata) {
  const extensionsService = InjectorModule.injector.get(ExtensionService);
  return function (target) {
    extensionsService.addExtensionTab(props.type, target, props);
  };
}

/**
 * Decortator for an Action extension
 */
export function StratosAction(props: StratosActionMetadata) {
  const extensionsService = InjectorModule.injector.get(ExtensionService);
  return function (target) {
    extensionsService.addExtensionAction(props.type, target, props);
  };
}

/**
 * Decorator for an Extension module providing routes etc.
 */

export function StratosExtension(config: StratosExtensionConfig) {
  const extensionsService = InjectorModule.injector.get(ExtensionService);
  return (target /** This needs to be here even if we don't use it */) => {
    if (config.routes) {
      extensionsService.addExtensionRoutes(config.routes);
    }
  };
}

export function StratosLoginComponent() {
  const extensionsService = InjectorModule.injector.get(ExtensionService);
  return (target) => {
    extensionsService.setLoginComponent(target);
  };
}



// Injectable Extension Service
@Injectable()
export class ExtensionService {

  public metadata = {
    routes: [],
    loginComponent: null,
    extensionRoutes: {},
    tabs: {},
    actions: {},
  };

  constructor(private router: Router) { }

  /**
   * Initialize the extensions - to be invoked in the AppModule
   */
  public init() {
    this.applyRoutesFromExtensions(this.router);
  }

  public setLoginComponent(component: Component) {
    this.metadata.loginComponent = component;
  }

  public addExtensionRoutes(routes: Route[]) {
    this.metadata.routes.push(routes);
  }

  /**
   * Apply route configuration
   */
  private applyRoutesFromExtensions(router: Router) {
    const routeConfig = [...router.config];
    const dashboardRoute = routeConfig.find(r => r.path === '' && !!r.component && r.component.name === 'DashboardBaseComponent');
    let needsReset = false;
    if (dashboardRoute) {
      this.metadata.routes.forEach(routes => dashboardRoute.children = dashboardRoute.children.concat(routes));
      needsReset = true;
    }

    if (this.metadata.loginComponent) {
      // Override the component used for the login route
      const loginRoute = routeConfig.find(r => r.path === 'login') || {};
      loginRoute.component = this.metadata.loginComponent;
      needsReset = true;
    }

    if (needsReset) {
      router.resetConfig(routeConfig);
    }
  }

  public addExtensionTab(tab: StratosTabType, target: any, props: any) {
    if (!this.metadata.tabs[tab]) {
      this.metadata.tabs[tab] = [];
    }
    if (!this.metadata.extensionRoutes[tab]) {
      this.metadata.extensionRoutes[tab] = [];
    }

    this.metadata.extensionRoutes[tab].push({
      path: props.link,
      component: target
    });
    this.metadata.tabs[tab].push(props);
  }

  public addExtensionAction(action: StratosActionType, target: any, props: any) {
    if (!this.metadata.actions[action]) {
      this.metadata.actions[action] = [];
      this.metadata.extensionRoutes[action] = [];
    }
    this.metadata.extensionRoutes[action].push({
      path: props.link,
      component: target
    });
    this.metadata.actions[action].push(props);
  }

  public getRoutesFromExtensions(routeType: StratosRouteType) {
    return this.metadata.extensionRoutes[routeType] || [];
  }

  public getTabsFromExtensions(tabType: StratosTabType) {
    return this.metadata.tabs[tabType] || [];
  }

  public getActionsFromExtensions(actionType: StratosActionType): StratosActionMetadata[] {
    return this.metadata.actions[actionType] || [];
  }
}

