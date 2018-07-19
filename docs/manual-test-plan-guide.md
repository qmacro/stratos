# Stratos manual test plan guide

This is a guide to writing a manual test for stratos. For every major release we should run through this list of manual tests to sanity check the application.

If you notice any parts of the application that we haven't tested or have added new functionality to the app, please add new tests.

> **Note: Manual tests are not a replacement for unit and e2e test. If you add a test here please ensure there is a unit and e2e that covers it too.**

## Test plan structure

The stratos manual test plan can be found under ` docs/manual-test-plan/ `.

Tests are catergorised as `pages` tests or `misc` test, you can find the corrisponding folders within `docs/manual-test-plan/`.

Within these top level folders are the `test plan` for an individual page or function. A `test plan` is a number of `ACTION.mt.md` files (`mt` standing for **m**anual **t**est) and a `description.md` file.

`ACTION.mt.md` files contain one or more tests that test a single function or action a user can do within the `test plan` remit.

>Example: Under the `application-wall` test plan (found under `docs/manual-test-plan/pages/application-wall`) you might find:
>create-application.mt.md, view-all-applications.mt.md, delete-application.mt.md

`misc` test plans are test plans that are not pages or are reaccuring tests ove multiple pages. An example of this might be testing a table. Tables can be found throughout the application and should be tested in a consistant way. In this case we should create a misc test plan like so:

`docs/manual-test-plan/misc/table`

Which may contain the following `.mt.md` files alongside a `description.md` file:

> filter.tp.md, search.tp.md, sort.tp.md



Below is a template that should be used when writing a test within a `.mt.md` file.

## Test template
Below is the template that all tests should follow.

---
>template start
---

Test name
---

### Description

Keep it short and sweet.
If the text it's too long or hard to explain, consider splitting the test up.

### Expected outcome

The state the application should be in when starting the test.
Be aware that the frontend will cache data and could effect the application

### Further notes (optional)

Anything that would help better understand the test or things to look out for.

### Related issues (optional)

If there is a corresponding github issue then they should be linked here.

### Starting state

The state the application should be in when starting the test.

>Be aware that the frontend will cache data and could effect the functionality of the application.

### Test steps
| Step number | Action | Expected outcome (optional) | Notes (optional) |
| --- | --- |  --- | --- |
| Use as a reference. | Short one liner on what the tester should do. | For complicated actions, what should the tester expect to happen? | Any additional information. |

---
>template end
---
