// components
import ResultsItem from './ResultsItem';

// data
import { resources } from '../data/resources';

export default function Results() {
  return (
    <section className="h-full mb-4">
      <div className="h-full rounded border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <strong className="text-sm text-gray-900">Results</strong>
          <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
            4
          </span>
        </div>

        {/* Replaced static/hardcoded JSX with our ResultsItem component, generated from our data */}
        <ul className="divide-y divide-gray-200">
          {
            resources.map(
              (r) => (
                <ResultsItem
                  key={r.id}
                  title={r.title}
                  category={r.category}
                  summary={r.summary}
                  location={r.location}
                >
                  {/*
                    children: A reserved keyword / automatically passed property (setting values to this will override it!)
                              for any nodes nested inside the current component. Nested stuff could be components, or even just HTML.
                              In this example, we have:
                    
                              <ResultsItem prop1=someValue prop2=someValue ...>
                                {someConditionalRendering}
                              </ResultsItem>

                              In this case, the result of {someConditionalRendering} is what's passed to ResultsItem as a prop named 'children' —
                              because that's what's nested *inside* ResultsItem. Again, this is automatic: if there was nothing inline, or the component was
                              self-terminating (i.e. <ResultsItem prop1=someValue ... />), the children prop would just hold null.
                  */}
                  {
                    // You've seen the OR || operator — thisIfTruthy || otherwiseThis
                    // Here, we're using the AND && operator — ifTruthy && thenDoThis
                    //   -> if the data element's .openNow is true, then render a cute lil' badge
                    r.openNow && (                    
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                        Open now
                      </span> 
                    )
                  }
                </ResultsItem>
              )
            )
          }
        </ul>
      </div>
    </section>
  );
}