// react-router hooks
import { useParams, useNavigate } from 'react-router';

// our custom hooks/components
import { useResources } from '../hooks/useResources';
import Card from '../components/ui/Card';
import AdminForm from '../components/admin/AdminForm';


export default function AdminPage() {

  const { resources, isLoading, error, refetch } = useResources();
  
  const { resourceId } = useParams(); // not doing anything with this yet
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="text-sm text-base-content/70">
          Manage student resources.
        </p>
      </div>

      {isLoading && <p>Loading resources...</p>}

      {error && (
        <div className="alert alert-error">
          <span>{error.message}</span>
          <button className="btn btn-sm" onClick={refetch}>Try again</button>
        </div>
      )}

      <AdminForm
        key={resourceId ?? 'new'}
        resources={resources}
        resourceId={resourceId}
        refetchResources={refetch}
      />


      <section className="md:col-span-3 lg:col-span-3">
        <Card title="Current Resources">
          <div className="card-body">
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li
                  key={resource.id}
                  className="rounded border border-gray-200 p-3"
                  onClick={() => { navigate(`/admin/${resource.id}`) }}
                >
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
};