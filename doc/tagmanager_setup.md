# Tagmanager setup

## For Nextjs

#### **`app.tsx`**

```jsx
const App = () => {
  return (
    <>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <LoadTagManager
            measurementID={process.env.NEXT_PUBLIC_GTM_ID}
        />
      )}
    </>
  );
};
```
