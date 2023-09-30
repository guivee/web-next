- Every screen needs to be responsive
- We dont care about Dark Mode yet
- Screens change based on User logged in
- Every on click Handler needs to be handled. IF the REST endpoint isnt provided, then mock the response
- Refer to postman collection for REST endpoints
- Checkout dev branch and create a new branch for project/feature
- Please create frequent PRs and merge changes to dev branch
- You can get auth token for postman by uncomenting the log statement getAuthUser(). Do not merge this change. Or you could get it from chrome dev tools.
- getLoggedInUser() gets current user details
- All user access control must be based off of user.access (get user details from getLoogedInUser())

Scope

[20230516]:

- Complete figma screens
- Get tabs to be highlighted when selected
- Get sidebar buttons highlighted when selected
- Use FormPanelComponent to create panels
- Use StackedLabel to create label-value pair
- Add endpoint urls to api_endpoints.ts
- Add IHI status and record status to patient details screen
