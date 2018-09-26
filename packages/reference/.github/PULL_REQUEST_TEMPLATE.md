### Overview

Related GitHub issue: #<tbc>

- [ ] Followed Documentation section
- [ ] Reviewed and filled in QA section
- [ ] Reviewed and filled in Code Review section
- [ ] Reviewed and filled in Database review section
- [ ] Reviewed and filled in Deployment section (including any commands that need to be run)
- [ ] Documented development process in PR
- [ ] Documented approach and thought process in issue

**Make sure you fill this out properly!** Describe what your change is here.

### Documentation
* Follow [YARD](http://www.rubydoc.info/gems/yard/file/docs/GettingStarted.md) documentation syntax
* Document any new / refactored classes
* Document any new / refactored public methods
* Update any documentation that may be out of date due to changes you have made
* Update API docs to any APIs you may have added / changed

### QA

* Describe how to test the change here
* Include steps you have taken locally to ensure that the code you are implementing works as expected
* How to test any other functionality that shares this code

### Code Review

* Describe the critical files for review here, if any.
* Any new concepts/patterns used should be included.
* List any new gems you've introduced – have they been reviewed by the team? If not, ask for consensus!

### Database Review

- [ ] Are the new/altered column names clear and understandable?
- [ ] Have we used the most appropriate data types?
- [ ] Are the required fields specified as non-null?
- [ ] Do the unique fields have unique indexes?
- [ ] Do queried fields have appropriate indexes?
- [ ] Do all association fields have foreign key constraints?
- [ ] Are validation constraints in-place for appropriate fields?
- [ ] Have we adhered to [strong migrations](https://github.com/ankane/strong_migrations)?
- [ ] Have you considered [what migrations lock Postgres](https://www.citusdata.com/blog/2018/02/15/when-postgresql-blocks/)?

### Deployment

If we have changed the database or the ElasticSearch indexes, please explain the
change here and how long it's expected to take for the migration to run.

List any commands which need to be run during the deployment process
