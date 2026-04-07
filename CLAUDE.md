# Architecture
- Follow a layered architecture model-view-controller (MVC) pattern
- file names should reflect their purpose
- organize files by feature/module
- file names should have a controller, service, model, route, util, middleware suffix based on their role

# Code style
- avoid using any or unknown; data type must always be specified
- Modularize functions
- Always apply SOLID principle
- break long functions into smaller ones
- Use meaningful variable and function names
- Separate concerns
- always add a comment header for each function explaining its purpose and parameters
- add inline comments for complex logic
- add diagrams where necessary to explain workflows
- add one happy path unit test for each function
- use camelCase for variable and function names
- use snake_case for database columns and tables
- use snake_case constants for constant values
- use snake_case for environment variables

# Frontend
- Follow a component-based architecture
- Prioritize server-side rendering than client-side rendering
