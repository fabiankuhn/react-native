# TODO-App
This App shows a Todo-List, in which items can be added and deleted.

## Concepts
- Modals
- FlatList and ScrollList
- Binding

## Flatlist
Add Items to the List
- Math Random is a placeholder for unique ID
- Spread Operator to add Goal
```jsx
setCourseGoals(currentGoals => [
  ...currentGoals,
  { id: Math.random().toString(), value: goalTitle }
]);
```

Display FlatList
- Forward item id to GoalItem to know, which item needs to be delete
- keyExtractor specifies id of Item
```jsx 
<FlatList
  keyExtractor={(item, index) => item.id}
  data={courseGoals}
  renderItem={itemData => (
    <GoalItem
      id={itemData.item.id}
      onDelete={removeGoalHandler}
      title={itemData.item.value}
    />
  )}
/>
```
