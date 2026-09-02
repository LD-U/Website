### **Context**

A core workflow for the web product “Lister” allows users to list a product for sale across multiple marketplaces. Users complete this task by entering details about the product (its dimensions, weight, attributes, price, etc.) including any necessary information determined by the marketplace (eBay, ShopGoodwill, or Shopify). Previous to the redesign, the listing task was completed using a scrolling, long form which was difficult for users to parse and prone to errors. 

![A screenshot from the web product “Lister” showing a custom builder template with various fields to configure and describe the item to be sold.](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/266b98d9-46fa-43cf-bcba-c3f01a2ed5ae/BuilderTemplate-Before.png)

Previous workflow: an example custom builder template for capturing specific product details based on the previously selected category 

![A screenshot of one page of the web product “Lister” showing a scrolling form for listing a new product with many fields needing to be configured.](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/d4d68879-3e30-47e0-b250-756868cfda2b/ProductFromBefore.png)

Previous workflow: the new product form for listing a new item for sale

### **About the company**

Upright Labs is a business-to-business SaaS company leading the thrift and secondhand retail industry with web and mobile products for inventory management and e-commerce.

### **Goals for the project**

- reduce the average time-to-list metric across all customer organizations
- help users identify fields are needed to configure to create a successful listing
- avoid disruption of current workflow
- focus user-attention and emphasize required fields
- reduce cognitive load for users listing products by reducing the amount of decisions
- prevent listing errors from happening by restricting submissions with missing values

### **Objective statement**

Take a contextual approach to the listing workflow with a redesigned layout that reduces the amount of content displayed and reduces the amount of data entry necessary for a successful listing. “Express List” was designed to increase the average monthly listings across client organizations and a decrease in the average time-to-list metric while also sustaining the average price per item sold.

### My **experience**

The challenges faced by the existing listing workflow were shared with me during my hiring process at Upright. I was tasked early in my onboarding to “reinvent” this critical workflow. Our product team was focused on increasing listing efficiency and reducing the time-to-list metric but was hesitant to disrupt users. This project was handled iteratively and I lead efforts to define objectives and find creative solutions to meeting them. The last phase of work, documented here, encompasses the user interface redesign, user testing, final recommendations based on user feedback, and artifacts generated to facilitate collaboration with the engineering lead assigned to development.

**My role**

- iterate on user interface recommendations based on new information
- test the new workflow with a design prototype with internal and external users
    - identify testing candidates, recruit, and schedule sessions
    - generate the scenario, task, and script
    - create recruiting, followup, and thank you messaging
    - synthesize findings and make recommendations based on feedback from users
- modify the design recommendations based on usability testing insights
- generate materials for facilitation collaboration with engineers

![Field functionality and display decision tree diagram for collaboration with engineers](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/aa49944a-b4d8-4860-9811-eb8574476cea/FieldsDiagram.png)

Field functionality and display decision tree diagram for collaboration with engineers

**Engineer's role**

- worked with design-identified objectives, principles, user stories, and feature lists to create a proof of concept
- selected a direction and developed a table and add to cart/check out experience
- iterated on the initial proof of concept after user testing validation
- applied final integration details and layout/styling into a release ready user experience

### **Discovery and Exploration**

![Early-stage wireframe: parent and sub category selection](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/7425b039-d512-426a-84ce-e34487c661c4/Screen_Shot_2024-04-30_at_10.37.12_AM.png)

Early-stage wireframe: parent and sub category selection

![Early-stage wireframe: auto-selection of parent category based on title with sidebar and progress indicator](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/4dc797e1-4046-4272-9616-36f52dbfcefb/Screen_Shot_2024-04-30_at_10.37.54_AM.png)

Early-stage wireframe: auto-selection of parent category based on title with sidebar and progress indicator

![Early-stage wireframe: wizard style with completed configuration and enabled advancement](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/c8b88858-0744-47e0-a396-07a131d2db7b/Screen_Shot_2024-04-30_at_10.38.01_AM.png)

Early-stage wireframe: wizard style with completed configuration and enabled advancement

![Early-stage wireframe: single column form with success and error indicators](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/b0460547-7da2-4fe9-9f8f-2933f5fe9a72/Screen_Shot_2024-04-30_at_10.38.25_AM.png)

Early-stage wireframe: single column form with success and error indicators

![Early-stage wireframe: auto-advance through one-field-at-a-time](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/5ca3424e-a827-4bbc-8f73-fed0aff68297/Screen_Shot_2024-04-30_at_10.34.15_AM.png)

Early-stage wireframe: auto-advance through one-field-at-a-time

![Mid-stage wireframe: responsive layout for mobile ](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/be5826ff-de23-406e-8c72-e642574fa058/Screen_Shot_2024-04-30_at_10.33.47_AM.png)

Mid-stage wireframe: responsive layout for mobile 

![Mid-stage wireframe: auto-advance, wizard-style layout](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/dac2277a-5ad4-45ca-a346-1851de4f5b6c/Screen_Shot_2024-04-30_at_10.36.22_AM.png)

Mid-stage wireframe: auto-advance, wizard-style layout

![Mid-stage layout: page progression ](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/dde43fa2-735a-4310-ab78-5eb53772e239/Screen_Shot_2024-04-30_at_10.34.58_AM.png)

Mid-stage layout: page progression 

![Mid-stage wireframes of layout options for review and discussion](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/7c58270a-b759-4a6d-b02e-4012dd76a7f1/Screen_Shot_2024-04-30_at_10.33.21_AM.png)

Mid-stage wireframes of layout options for review and discussion

### **Usability testing recruitment and facilitation**

I created a potential participant recruiting pool using quantitative data based on the amount of custom builder templates an organization uses and varied the participants based on organization size, engagement level, and organization type to create a diverse potential pool of participants.   ****

![Screen Shot 2024-04-11 at 12.42.42 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/46ebc15f-3913-467f-ab46-8b5e891b4db0/Screen_Shot_2024-04-11_at_12.42.42_PM.png)

### **Usability Testing a clickable design prototype**

I engaged participants in a tasked-based, observational test of the design prototype to gather feedback directly from users about the information architecture, functionality, and new layout of the listing workflow. The learning objective was to validate our early hypothesis and test assumptions about how users would

**Hypothesis to validate**

We believe that by reducing the cognitive load of parsing fields within a full form through only showing fields that are needed, users will (in time) be able to list faster.

**Assumption busting**

- users will be looking for specific fields and feel required to enter a value for specific fields
- users will overlook builder templates/product attributes with a “single page form”

![Screen Shot 2024-04-29 at 9.03.52 AM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/7d145de9-6827-4e77-8c2c-475869e508bc/Screen_Shot_2024-04-29_at_9.03.52_AM.png)

![Screen Shot 2024-04-29 at 9.04.44 AM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/b8eb89f8-2d5d-47ab-8fef-52fa39b5e4bc/Screen_Shot_2024-04-29_at_9.04.44_AM.png)

![Screen Shot 2024-04-29 at 9.05.21 AM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/2cd55484-cfd2-4abf-baca-ea41d9fc8c1e/Screen_Shot_2024-04-29_at_9.05.21_AM.png)

![Screen Shot 2024-04-29 at 9.06.37 AM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/2c2264ea-e595-43d0-a7f0-d86f1ec1ada4/Screen_Shot_2024-04-29_at_9.06.37_AM.png)

### **User testing feedback**

**Findings and Top Takeaways**

- the side drawer was not discoverable by any participant unless prompted
- “missing” elements/fields seemed to be specific to the workflow of each organization
    - some found nothing missing, others would not have successful listings without the ability to define: scheduling, shipping weight, box size etc.
- many participants mentioned the listing role as a “final check” with the processing role handling the majority of the heavy lifting:
    - documenting product condition, dimensions, testing, and details about the item

### **Solution**

- improve the discoverability of the side drawer
- make fields flexible if possible to have admins define who (permissions) sees what
- adjust the listing strategy to be contextual
    - if there are multiple listing strategy matches based on the category – display the listing strategy selection field within the workflow
- future iterations: allow Link to complete product attributes
- ensure keyboard navigation across fields and cards is optimized for speed
- [Potentially] Make some fields (like price) hidden with Admin settings or user permission based
    - ex: some orgs don’t want listers (or some listers) to be able to change the price or set the listing type to buy-it-now.

![End-stage layout and functionality mockup: configuring listing](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/7f4fa059-bd37-4765-af7b-8fb5200237f8/With_Builder_Template.png)

End-stage layout and functionality mockup: configuring listing

![End-stage layout and functionality mockup: fully configured listing with side drawer open](https://prod-files-secure.s3.us-west-2.amazonaws.com/0a92147d-8b9f-4fcd-be39-a947ca49128b/9136f1ec-d919-435a-89f4-b49d7b1b3527/Channel_Details_and_Builder_Template.png)

End-stage layout and functionality mockup: fully configured listing with side drawer open

### **Outcomes**

The “Express List” feature is currently in development to finish the front-end implementation and final visual design changes. The workflow is a stronger approach to solving for the original productivity efficiency objective. Iterative design cycles created a layout that is future-proof for planned enhancements and additional features as well as responsive and mobile friendly. “Express List” will be launched to all users upon development completion and will co-exist along side the existing workflow, giving users a choice between the two.

### **Learnings**

Stepping back into projects with fresh eyes can help to elevate, improve, and strengthen projects with knowledge gained in-between active design cycles.  Working iteratively also helped to redefine and focus the objectives of the project and was necessary to designing holistically.