import { getResources, getResourceById } from './api/resources';

export async function resourceDirectoryLoader() {
  const resources = await getResources();
  // whatever the named properties of the data items are -> what we'll be consuming
  // by name in the components that use these loaders
  return { resources };
  /* 
    usage in component: 
      const data = useLoaderData();
      console.log(data.resources);
  */
}

// this one's a little bit more complicated, because what we do depends on whether
// we get a resourceId from the route (e.g. 'admin/' vs. 'admin/tutoring')
export async function adminLoader({ params }) {}
