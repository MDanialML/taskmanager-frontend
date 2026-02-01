import Navbar from "../components/Navbar";

function DashboardPage(){
    return(
        <>
        <Navbar/>
        <div className="grid grid-cols-12 gap-4 p-4">
            <div className="col-span-2 bg-white rounded-lg shadow-md p-4">
                 <h3 className="text-lg font-semibold mb-4">Categories</h3>
                    <div className="space-y-2">
                        <div className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded cursor-pointer">All</div>
                        <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Work</div>
                        <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Personal</div>
                        <div className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Shopping</div>
            </div>
        </div>

        <div className="col-span-5 bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-4">Incomplete Tasks</h3>
                    <div className="space-y-3">
                        {/* Placeholder tasks */}
                        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                            <h4 className="font-semibold">Learn React</h4>
                            <p className="text-sm text-gray-600">Complete React tutorial</p>
                        </div>
                        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                            <h4 className="font-semibold">Design UI</h4>
                            <p className="text-sm text-gray-600">Create dashboard layout</p>
                        </div>
                        <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                            <h4 className="font-semibold">Deploy App</h4>
                            <p className="text-sm text-gray-600">Deploy to production</p>
                        </div>
                    </div>
                </div>
            
                <div className="col-span-5 bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-4">Completed Tasks</h3>
                    <div className="space-y-3">
                        {/* Placeholder tasks */}
                        <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                            <h4 className="font-semibold">Build API</h4>
                            <p className="text-sm text-gray-600">Create task endpoints</p>
                        </div>
                        <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                            <h4 className="font-semibold">Write Tests</h4>
                            <p className="text-sm text-gray-600">Add unit tests</p>
                        </div>
                    </div>
                </div>

        </div>
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors text-2xl flex items-center justify-center">
            +
        </button>
        </>
    );
}
export default DashboardPage