```typescript
import { ComponentMeta, ComponentStory } from "@storybook/react";
import MyComponent from "./MyComponent";

export default {
	component: MyComponent,
	argTypes: {},
} as ComponentMeta<typeof MyComponent>;

export const Basic: ComponentStory<typeof MyComponent> = (props) => (
	<MyComponent {...props} />
);
```
