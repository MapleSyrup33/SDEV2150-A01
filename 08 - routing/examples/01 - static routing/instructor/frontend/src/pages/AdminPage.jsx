// react hooks
import { useState } from 'react';

// our custom hooks
import { useResources } from '../hooks/useResources';

// our components
import Card from '../components/ui/Card';


const EXAMPLE_RESOURCE = {
  title: 'Study Group',
  category: 'Wellness',
  summary: 'Studying in a group (of people).',
  location: 'NAIT Campus',
  hours: 'Mon-Fri 08:00-13:00',
  contact: 'niceperson@nait.ca',
  virtual: false,
  openNow: false,
}

const EMPTY_RESOURCE = {
  title: '',
  category: '',
  summary: '',
  location: '',
  hours: '',
  contact: '',
  virtual: false,
  openNow: false,
}


export default function AdminPage() {

  const { resources, isLoading, error, refetch } = useResources();

  {/* 
    You'll notice that the onChange -> setter syntax is a little different
    in the bound inputs in the JSX.

    First of all, we're using an object that holds all our fields instead of
    multiple state variables (yay).

    Second, remember — state variables are immutable, meaning we can't just change
    e.g. one little property in an object; we need to completely reconstruct it
    and somehow supply our new values/modifications while doing that.

    So we use the spread operator (which works for any sequenced/serialised data type,
    not just arrays) to pull all the properties/values of the existing object,
    and then specifically overwrite (by supplying a more recent value) one field/property.

       const newData = {...oldData, field: newValue}

    where ...oldData already includes field: oldValue; we're just overwriting it with recency.
  */}
  const [formData, setFormData] = useState(EXAMPLE_RESOURCE)

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Resource Form">
          <div className="card-body">
            <form id="frm-add-resource" className="space-y-4">

              <div className="space-y-1">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: event.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: event.target.value})}
                >
                  {['Academic', 'Wellness', 'Financial', 'Tech'].map(
                    (label) => { 
                      return <option value={label}>{label}</option>
                    }
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: event.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                  Hours
                </label>
                <input
                  id="hours"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource hours (e.g. Mon-Fri 08:00-13:00)"
                  value={formData.hours}
                  onChange={(e) => setFormData({...formData, hours: event.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  id="contact"
                  type="text"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                  placeholder="Resource contact (e.g. email@nait.ca)"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: event.target.value})}
                />
              </div>

              <div className="flex gap-6">
                <div className="space-y-1">
                  <label htmlFor="virtual" className="block text-sm font-medium text-gray-700">
                    Virtual (online-only)
                  </label>
                  <input
                    id="virtual"
                    type="checkbox"
                    className="rounded border border-gray-300 text-sm"
                    checked={formData.virtual}
                    onChange={(e) => setFormData({...formData, virtual: event.target.checked})}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="open-now" className="block text-sm font-medium text-gray-700">
                    Open Now
                  </label>
                  <input
                    id="open-now"
                    type="checkbox"
                    className="rounded border border-gray-300 text-sm"
                    checked={formData.openNow}
                    onChange={(e) => setFormData({...formData, openNow: event.target.checked})}
                  />
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="flex gap-2">
                <button
                  type="reset"
                  className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  onClick={() => setFormData(EMPTY_RESOURCE)}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="rounded bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </Card>
      </section>

      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            {isLoading && <p>Loading resources...</p>}

            {error && (
              <div className="alert alert-error">
                <span>{error.message}</span>
                <button className="btn btn-sm" onClick={refetch}>Try again</button>
              </div>
            )}
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.id} className="rounded border border-gray-200 p-3">
                  <p className="font-semibold">{resource.title}</p>
                  <p className="text-sm text-base-content/70">{resource.category}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </>
  );
}