# api-admin
Admin Interface for the API - Data

#### Requirements - Mysql
* To Install Mysql Locally - https://gist.github.com/nrollr/3f57fc15ded7dddddcc4e82fe137b58e
* After it is installed, Clone repo & set Environment Variables. See below -

#### Install Repo
* Clone `develop` Branch
* Create your own Branch - `git checkout -b "Your_Own_Branch_Name"`
* Install Packages - `npm install`

#### Environment Variables
* Copy `.env.example` file and paste it as `.env` in the same directory (root directory).
* Update the relevant values of environment variables. They will be loaded into environment at the run-time.

#### Running Migrations
* Run `npm run db:migrate`
* To create a new migration file, run `npm run db:create`
* If for any reason, you want to rollback, run `npm run db:rollback`
* If you encounter any error, report it in issues.

#### Running Seeds
* Run `npm run db:seed:run`
* To create a new seed file, run `npm run db:seed:create`
* If you encounter any error, report it in issues.

#### Running App in Development Mode
* Once the Env Variables are set, DB Migrations are done, call `npm start`

#### Production Settings
* Build the code - `npm run build`
* Deploy the Dist folder
* Run - `npm run serve`

#### Contribution
* Create a new branch to work on a new issue.
* Finish your work in the new branch.
* Once you're done, create a new PR against `develop` branch.
* Put known developer in the reviewer list.
* Reviewers will review the changes and either approve it or ask for more changes.
* Once the PR is approved, the PR will be merged into `develop`.
* And the issue will be closed when `develop` branch is merged into `master`.

#### More Content to follow

## Project Management Workflow
Below is a table and memos outlining the process we follow to efficiently organize and manage the development of the API. Holistically, we use GitHub branching, pull requests, issues, projects, and milestones to streamline the collaboration among OpenMessage engineers.

| Step | Name | Description |
| --- | --- | --- |
| 1 | Review Abstract | You will be assigned an issue with a Project Management Abstract label. Review the description of this issue and reach out to product managers if additional clarity is needed. |
| 2 | Cross-Review the API Docs | Take note of what the OM API Docs already contains, and what it does not already support relative to the requirements of the abstract issue. |
| 3 | Record new API Requirements | With pen and paper or a digital document, write down the new API requirements you will need to create in order to develop the abstract issue. |
| 4 | Create Sub-Atomic Issues | Create very granular issues for each sub-atomic (SA) task, that is, do not combine multiple tasks in one GitHub Issue. For each SA issue, assign it to the same project and milestone as the original abstract issue, and also give it an expected complexity label based on Fibonacci #s: 1,2,3,5,8,13,21 |
| 5 | Make a branch/PR per SA Issue Development | For each SA issue, make a new branch and pull-request (PR) against the Develop branch. If any PR is dependent on another, leave notes in the PR description (e.g. "Merge #3 before merging this PR"). Add three reviewers to your PR. |
| 6 | Reviewers review | Reviewers review, provide feedback, and ask for changes if needed. Each PR should get a minimum of three approvals after view. Once all feedback is resolved, and PR gets three approvals, the PR can be merged into `develop` and the issue, closed. |
| 7 | Pat yourself on the back | You're a big boy or girl and followed the process correctly! You deserve a nice pat on the back and an imported craft beer of your choosing. |
