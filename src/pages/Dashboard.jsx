// import { useHistory } from 'react-router-dom';

function Dashboard({ data, onConfirm, onGoBack }) {
//   const history = useHistory(); 

  const handleConfirm = () => {
    onConfirm();
  };

  const handleGoBack = () => {
    onGoBack();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Confirmation Page</h1>
        <p className="mb-2">
          <span className="font-semibold">Name:</span> {data.name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {data.email}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Mobile:</span> {data.mobile}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Property Type:</span> {data.propertyType}
        </p>

        <div className="flex justify-center">
          <button
            className="bg-teal-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-teal-600"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;