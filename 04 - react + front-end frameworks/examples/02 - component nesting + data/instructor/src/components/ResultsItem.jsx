// We still have to specifically name 'children' as a property we're inputting to the function,
// because we're destructuring what would otherwise be a single props object that contained every specific prop.

// If we just did:
//     ResultsItem(collectedPropsInput)
// then every prop passed would be accessible via:   collectedPropsInput.title, collectedPropsInput.children, etc.

// I encourage you to use destructuring, because it makes code more readable/maintainable:
// You know exactly what you're using/expecting from just the function signature,
// instead of not being able to figure that out without looking at every single line inside the function.

export default function ResultsItem({ title, category, summary, location, children }) {
  // console.log(children);
  return (
    <li className="px-4 py-3 text-gray-900 hover:bg-gray-50">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          {/* And here's where *whatever* is nested inside a ResultsItem would render.
              In our case it's just a little badge, but it could be an entire hierarchy of other components! */}
          {children}
          <small className="text-xs text-gray-500">{category}</small>
        </div>
      </div>

      <p className="mt-1 text-xs text-gray-500">{summary}</p>

      <small className="mt-1 block text-xs text-gray-500">{location}</small>
    </li>
  );
}
