import React, { useState, useEffect } from 'react';
import Layout from './dashboard';

const Table = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [modalImage, setModalImage] = useState(""); // Image to show in modal
  const itemsPerPage = 10;

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://62.72.29.180/api/v1/auth/entries/?page=${page}&limit=${itemsPerPage}`
      );
      const result = await response.json();
      if (result && result.entries && result.pagination) {
        setData(result.entries);
        setTotalPages(result.pagination.totalPages);
      } else {
        setError('Failed to load data');
      }
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Recursively flatten nested objects to display in a table.
  const flattenData = (obj) => {
    const flattened = {};
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        const nestedData = flattenData(obj[key]);
        for (const nestedKey in nestedData) {
          flattened[`${key}_${nestedKey}`] = nestedData[nestedKey];
        }
      } else {
        flattened[key] = obj[key];
      }
    }
    return flattened;
  };

  const formatHeader = (key) => {
    // Split the key on underscores
    const parts = key.split('_');
    // Capitalize each part and join with a space
    return parts
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  const generateHeaders = () => {
    if (data.length > 0) {
      const flattenedData = flattenData(data[0]);
      return Object.keys(flattenedData).map((key, index) => (
        <th
          key={index}
          className="px-4 py-2 border-b border-gray-200 text-left font-semibold text-sm text-gray-700"
        >
          {formatHeader(key)}
        </th>
      ));
    }
    return null;
  };

  const generateRows = () => {
    return data.map((item, rowIndex) => {
      const flattenedItem = flattenData(item);
      return (
        <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
          {Object.keys(flattenedItem).map((key, cellIndex) => {
            const value = flattenedItem[key];

            if (key === "AadharCard" || key === "DrivingLicense") {
              return (
                <td key={cellIndex} className="px-4 py-2 border-b border-gray-200 text-sm text-gray-600">
                  {value ? (
                    <img
                      src={`http://62.72.29.180/itdwc/uploaded_files/${value}`}
                      alt={key}
                      className="w-16 h-16 object-cover rounded cursor-pointer"
                      onClick={() => {
                        setModalImage(`http://62.72.29.180/itdwc/uploaded_files/${value}`);
                        setShowModal(true);
                      }}
                    />
                  ) : (
                    "NIL"
                  )}
                </td>
              );
            }

            return (
              <td key={cellIndex} className="px-4 py-2 border-b border-gray-200 text-sm text-gray-600">
                {value || 'No Data'}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-6 text-gray-600">Loading...</div>
          ) : error ? (
            <div className="text-center py-6 text-red-500">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>{generateHeaders()}</tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {generateRows()}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded transition duration-300 ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Prev
          </button>
          <span className="text-gray-700 font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded transition duration-300 ${
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>

        {/* Image Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded max-w-3xl max-h-full overflow-auto">
              <img src={modalImage} alt="Image" className="w-full h-auto" />
              <button
                className="mt-4 bg-red-500 text-white p-2 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
