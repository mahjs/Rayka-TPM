# Rayka TPM Dashboard

## Introduction

The Rayka TPM Dashboard is a comprehensive tool designed for effective network management, showcasing service IPs and tracking traffic consumption across various services. Users can add new IP addresses and names, observing updates in real-time. The program also allows for exporting data in different formats. It provides detailed insights into service shares, domain counts, and total IP addresses through interactive charts. Additionally, users can view their activity history and manage their accounts, including registering, editing personal information, or logging out.

## Features

- Interactive Service Share Visualization: View the proportionate traffic share of each service in the first chart, with clickable segments that reveal session counts and IP addresses in the services and IP address section.

- Consumed Traffic Analysis: The second chart displays the consumed traffic amount for each IP or website, offering a clear view of network utilization.

- Manage IP Addresses: Easily add a new IP address by providing the website address and service IP, or remove existing ones with a simple click in the services and IP addresses section.

- Search Functionality: Utilize the search box to quickly locate specific services or IP addresses within the dashboard.

- Data Export Options: Export data conveniently in PDF, Excel, and CSV formats using the output button for reporting and analysis needs.

- User Activity Records: On the profile page, monitor or delete records of user activities for comprehensive user activity tracking.

- User Account Management: Access user information on the profile page or securely log out of the user account as needed.

## Technologies Used

Apologies for the oversight. Here's the revised section for React without the mention of SEO:

### React

- **Description**: React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It enables the creation of complex, interactive UIs with less code and facilitates the development of component-based architecture.

- **Role in Project**: React is the cornerstone of our dashboard's front-end. It allows us to create a dynamic and responsive interface, where state changes are managed smoothly without page reloads. This enhances the user experience by providing a seamless interaction with the dashboard's real-time data visualizations and management features.

### React Router DOM

- **Description**: `react-router-dom` is a comprehensive tool for managing web navigation in React applications.
- **Role in Project**: It simplifies creating and organizing routes in our app. We use components like `<Router>`, `<Route>`, and `<Link>` for straightforward routing implementation. The library also supports dynamic routing, adapting to user interactions and specific project needs, making it an adaptable solution for our web application's navigation structure.

### axios

- **Description**: Axios is a versatile HTTP client for browsers and Node.js, known for its easy-to-use API and automatic JSON data handling.
- **Role in Project**: Axios streamlines server communication by handling data requests and responses efficiently. We chose Axios over Fetch due to its wide range of features, including error handling, request cancellation, and security against cross-site request forgery (XSRF). These attributes ensure reliable data exchange and enhance the overall performance of our platform.

### Recharts

- **Description**: Recharts is a charting library built on React components, offering a seamless integration with React applications. It provides a collection of composable and customizable chart components.
- **Role in Project**: Richard utilized Recharts for its adeptness in rendering data-driven graphs and charts, which was instrumental in depicting the data traffic and the share of each website within our dashboard. This enabled us to present complex traffic data in an accessible and comprehensible manner.

### @emotion/react and @emotion/styled

- **Description**: @emotion/react and @emotion/styled are powerful tools for writing css styles with JavaScript, part of the Emotion library, which is a performant and flexible CSS-in-JS library.
- **Role in Project**: These tools were employed to provide dynamic styling capabilities within our dashboard. They allowed for the creation of components with intricate designs and the ability to change styles based on state or theme changes. This made it possible to maintain a consistent look while also supporting various visual representations of data, contributing to a more engaging user interface.

### @mui/material

- **Description**: @mui/material is a React UI framework that implements Google's Material Design, providing a suite of pre-designed and fully customizable
- **Role in Project**: This framework was integral to developing our dashboard's user interface. It enabled us to implement a consistent and modern design language quickly. The comprehensive range of components from @mui/material helped us maintain design consistency and responsiveness across different devices, ensuring a professional look and feel that enhances user interaction.

### React Icons

- **Description**: React Icons includes a large collection of icon sets that are easily implemented into a React application, offering scalable icons for the UI.
- **Role in Project**: React Icons were utilized throughout the dashboard to provide intuitive visual cues and enhance the overall user experience. They help to guide users through the dashboard's functionality, offering a familiar and accessible way to interact with the dashboard's features.

### TypeScript

- **Description**: TypeScript is an open-source language that builds on JavaScript by adding static type definitions. Types provide a way to describe the shape of an object, providing better documentation, and allowing TypeScript to validate that your code is working correctly.
- **Role in Project**: The use of TypeScript in our project significantly enhances the development workflow by introducing type safety and reducing the likelihood of runtime errors. With clear type definitions, developers can confidently make changes and refactor code, ensuring that components interact as expected. This added layer of security makes the development process smoother and faster, as many potential errors can be caught at compile time rather than during runtime, which is particularly beneficial in a collaborative environment where understanding code at a glance becomes crucial. The autocompletion and intelligence features provided by TypeScript also streamline the development process, making it more intuitive and productive.

### ESLint (v8.53.0) and related plugins

- **Description**: ESLint is a static code analysis tool for identifying and rectifying patterns in JavaScript and TypeScript that don't align with predefined coding standards or could lead to errors.
- **Role in Project**: We integrated ESLint to enforce a consistent coding style across the entire development team and to prevent potential bugs before they occur. The specific version 8.53.0, along with various plugins, ensures our code adheres to the best practices and remains clean and easy to read, which is particularly important as the project scales and more developers contribute to the codebase.

### Tailwind CSS

- **Description**: Tailwind CSS? It's this super cool toolkit for styling your web pages without the fuss. Think of it like having a bunch of ready-to-use styling options at your fingertips.

- **Role in Project**: Here’s what it does for us:
  Styling Made Easy: We get to boss around how elements look with total ease. Want to tweak something? Bam! Done.
  Speedy Styling: It’s like putting your webpage's style on fast-forward. No more waiting around to get things looking sharp.
  Adapts Like a Chameleon: This thing makes sure our site looks good on any device, and it’s tight on security too.

### PostCSS (v8.4.32) and Autoprefixer (v10.4.16)

- **Description**: PostCSS is a powerful tool for transforming CSS with JavaScript plugins, allowing developers to use next-generation CSS features. Autoprefixer, a PostCSS plugin, automatically adds vendor prefixes to CSS rules, ensuring cross-browser compatibility.
- **Role in Project**: In our project, PostCSS and Autoprefixer play a crucial role in optimizing the final CSS output. PostCSS allows us to utilize advanced CSS features and write cleaner, more maintainable stylesheets. Autoprefixer ensures that our CSS works consistently across different web browsers by automatically handling vendor prefixes. This combination enhances the visual consistency and performance of our dashboard across various platforms and devices.

### @vitejs/plugin-react-swc

- **Description**:Vite is a cutting-edge frontend build tool that significantly streamlines the development experience. It stands out for its faster build times, leveraged by ESBuild, a high-performance engine that powers Vite.
- **Role in Project**: In our project, Vite plays a pivotal role in enhancing the development workflow. It dramatically increases startup speed by 10-100x, thanks to ESBuild. This acceleration in the feedback loop during development means our application is not only quick to load but also allows for more efficient and productive development, enabling rapid iteration and quicker realization of project goals.

## Getting Started

- **Clone the repository**

```bash
git clone https://github.com/sina-ss/rayka-tpm-dashboard

# Navigate to the project directory

cd rayka-tpm-dashboard

# Install the dependencies with pnpm

pnpm install

# Start the development server

pnpm run dev
```

## Project Structure

In our Rayka-TPM Dashboard project, we adhere to a structured and intuitive directory layout to facilitate scalability and ease of maintenance. Here is a formal presentation of our project's structure:

**/src**: This directory represents the cornerstone of our application, encompassing the entirety of our active source code.

- **/assets**: Within this sub-directory, we house our global static assets, which include fonts located in `/fonts` and image resources in `/images`. Among these assets is the notable `react.svg` file.
- **/components**: We organize our user interface components within this directory, categorizing them into functional sub-directories such as `/dashboard`, `/login`, `/notfound`, and `/profile`, reflecting the segmented architecture of our application.
- **/contexts**: Here, we maintain our React context files, like `authContext.tsx`, which are pivotal for managing and disseminating state throughout our application.
- **/hooks**: In this directory, we curate custom React hooks such as `useDomains.ts`, `useIpAddresses.ts`, and `useTreeMapData.ts`, which encapsulate reusable stateful logic, thereby promoting efficiency and consistency across components.
- **/layout**: Our global styles are defined in the `App.css` within this directory, along with components that contribute to the application's layout.
- **/pages**: This directory is dedicated to React components that render as full-page entities, comprising `Dashboard.tsx`, `Login.tsx`, `NotFound.tsx`, and `Profile.tsx`.
- **/routes**: The `routes.tsx` file, contained within this directory, lays out the routing scheme of our application, orchestrating navigation across different components.
- **/services**: Our service files, such as `auth.ts`, `clientApis.ts`, and `domain.ts`, reside here, centralizing the logic associated with our API interactions.
- **/utils**: We allocate this directory for utility functions, with files like `convertToPersianWord.ts` and `formatPersianDateTime.ts` that serve common programming functions across our project.

- **App.tsx**: As the root component of our React application, this file amalgamates various UI components and their underlying logic.
- **main.tsx**: Designated as the initial entry point, this script initiates the rendering process of our React application into the DOM.

**/public**: We utilize this directory to store static files that are served directly to the web browser, including the essential `index.html` file.

**/.eslintrc.js**: Our configuration file for ESLint, which we employ to analyze and enhance the quality of our JavaScript code.

**/.gitignore**: This file lists the files and directories that we have intentionally excluded from Git tracking.

**/index.html**: Serving as the portal to our application, this primary HTML file is loaded when our application is accessed in a web browser.

**/package.json**: This manifest delineates our project's dependencies and scripts, providing a blueprint for the project's requirements and facilitating developer operations.

**/pnpm-lock.yaml**: Generated automatically, this file locks the versions of our dependencies to ensure a consistent installation across environments.

**/postcss.config.js**: We use this configuration file to define the behavior of PostCSS, a tool that allows us to apply JavaScript plugins to our CSS.

**/README.md**: Our markdown-formatted documentation provides exhaustive information about our project, including setup and contribution guidelines.

**/tailwind.config.js**: This file contains the configuration for Tailwind CSS, supporting our utility-first styling methodology.

**/tsconfig.json** & **/tsconfig.node.json**: These TypeScript configuration files are essential to our use of TypeScript, setting the compiler options and upholding our standard for type safety.

**/vite.config.ts**: In this configuration file, we outline the settings for Vite, which plays a critical role in refining our development and build process, leveraging the tool's expedited serving and building capabilities.

## Key Dependencies

In the development of the Rayka-TPM Dashboard, we have integrated a selection of key dependencies that are instrumental in providing the robust functionality and aesthetic appeal that our application boasts. Here is an exposition of the primary libraries and frameworks that form the foundation of our project:

- **@emotion/react** & **@emotion/styled**: These libraries are part of the Emotion styling framework, which allows us to write CSS styles with JavaScript. They enable dynamic styling in our application, which is particularly useful for theming and responsive designs.

- **@mui/material**: This is the Material-UI library, a comprehensive suite of React UI components that follow Material Design principles. It offers a wide range of pre-designed components such as buttons, cards, and dialogs that expedite the development process and ensure a consistent UI.

- **axios**: Axios is a promise-based HTTP client that we use for making asynchronous HTTP requests to REST endpoints. Its ease of use and wide adoption make it a reliable choice for our data-fetching needs.

- **react** & **react-dom**: React is the core library for building our user interface, and React DOM provides the necessary methods for rendering components into the DOM. These two dependencies are vital for the creation and management of our application's UI.

- **react-icons**: This library includes a vast array of icons from different icon sets, which we can easily incorporate into our React components. It simplifies the process of adding icons and enhances the visual aspects of our UI.

- **react-router-dom**: As a standard library for routing in React, it enables the navigation between different components within our application, effectively managing the views displayed to the user based on the URL.

- **recharts**: A charting library built on React components, it allows us to create responsive and customizable charts and graphs for data visualization purposes.

For the development and maintenance of our application, we rely on several development dependencies:

- **@types/react** & **@types/react-dom**: These are the TypeScript type definitions for React and React DOM, respectively. They are essential for our development in TypeScript, providing type checking and autocompletion features that enhance our development workflow.

- **@typescript-eslint/eslint-plugin** & **@typescript-eslint/parser**: These plugins allow ESLint to interface with TypeScript, enabling us to maintain code quality and adhere to best coding practices within our TypeScript codebase.

- **@vitejs/plugin-react-swc**: This Vite plugin leverages the swc toolchain to compile React components with speed and efficiency, significantly improving our build times.

- **autoprefixer**: A PostCSS plugin, autoprefixer adds vendor prefixes to our CSS, ensuring cross-browser compatibility for modern CSS features.

- **eslint**: The core ESLint library, which is a static code analysis tool for identifying and fixing problematic patterns in JavaScript and TypeScript code.

- **eslint-plugin-react-hooks**: Enforces the rules of hooks, a feature of React necessary for writing custom hooks correctly.

- **eslint-plugin-react-refresh**: Integrates React Fast Refresh into our development environment, enabling hot reloading with state retention when we modify our React components.

- **postcss**: A tool for transforming CSS with JavaScript plugins, providing capabilities such as nested rules and variables in CSS.

- **tailwindcss**: A utility-first CSS framework that we use for writing CSS directly in our components. It enables us to build custom designs quickly and with less code.

- **typescript**: The TypeScript language is a strict syntactical superset of JavaScript, adding static type checking. This allows us to catch errors and bugs before runtime, improving the reliability of our code.

- **vite**: A modern build tool that serves our code via native ES modules, enabling a faster and more efficient development experience.

These dependencies are meticulously selected and integrated into our project, ensuring that we leverage the best tools available for building a sophisticated and high-quality web application.

### Website Architecture and Functionalities

Our Rayka-TPM Dashboard is meticulously architected to cater to the specific needs of network management and monitoring. Each page within our dashboard is strategically designed to facilitate control, visibility, and security, enabling us to maintain a robust and efficient network ecosystem.

#### Dashboard Page (Main Page)

The Dashboard, serves as the command center for network oversight. It provides a comprehensive view of network traffic and host activities in real-time. This page is instrumental for us in monitoring the volume of traffic each host generates and their respective IP addresses. The interactive treemaps and graphs offer intuitive navigation through traffic data, allowing for quick identification of traffic distribution and potential anomalies. The dashboard enables us to keep our finger on the pulse of the network's health, ensuring we can swiftly respond to any irregularities.

#### Profile Page

The Profile page, presents a personalized view of user information and activity history. It is a critical component for individual user management, giving us the ability to review and manage user-specific data, including access patterns and preferences. The page tracks and displays historical data of user activities, which is essential for auditing and compliance purposes. This personalization ensures that user profiles are kept up-to-date and that security measures are tailored to individual usage patterns.

#### Login Page

Featured in the Login page, which facilitates secure access to our dashboard. This page is designed to authenticate users by requesting their phone number and verifying it with a code sent to the same number. This two-step verification process is a part of our commitment to security, ensuring that only authorized personnel can gain access to the network management tools. The Login page is the gateway to the dashboard, enforcing our security protocols right from the start.

Each page within the Rayka-TPM Dashboard is interconnected, providing a seamless experience for network administrators. The architecture is built to support scalability, ensuring that as the network grows, the dashboard evolves in tandem to meet new challenges and requirements. Our approach to the dashboard's design is centered on providing a user-friendly, secure, and comprehensive tool for network management.
