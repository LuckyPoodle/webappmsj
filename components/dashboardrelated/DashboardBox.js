import React, { useEffect } from 'react';


const DashboardBox = ({ title,data, icon, color }) => {


  return (  <div>
    <div className="flex w-full items-center dark:bg-gray-900 py-12 px-6 flex justify-center items-center ">
        <div>
            <div className="max-w-xs h-64 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                <div>
                    <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{title}</h4>
                    <p className="text-gray-800 dark:text-gray-100 text-sm"></p>
                </div>
                <div>
                    <div className="flex items-center justify-between text-gray-800">
                        <p className="text-sm dark:text-gray-100">{data}</p>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  
   
  )
}

export default DashboardBox;