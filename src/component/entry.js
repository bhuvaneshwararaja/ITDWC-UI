import React, { useState } from 'react';
import Layout from './dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EntryForm = () => {
  const [formData, setFormData] = useState({
    personalInformation: {
      name: "",
      age: "",
      region: "",
      motherTongue: "",
      religion: "",
      community: "",
      educationQualification: "",
      economicStatus: "",
      fatherName: "",
      spouseName: "",
      residentialAddress: "",
      occupation: "",
      yearsOfExperience: 0,
      state: "",
      district: "",
      contactNo: "",
      aadharCard: null,
      drivingLicense: null
    },
    employmentAndInsurance: {
      presentlyWorkingDetails: "",
      hasInsurance: false,
      facedAccident: false,
      enrolledInWelfareBoard: false,
      welfareBoardBenefits: ""
    },
    healthAndMedicalHistory: {
      hasHealthIssues: false,
      healthIssuesDescription: "",
      underMedication: false,
      eyeScreeningDone: false,
      eyeDefectsIdentified: ""
    },
    trainingAndAwareness: {
      attendedSoftSkillTraining: false,
      trainingDetails: "",
      awareOfRoadSafety: false
    },
    medicalAndOcularHistory: {
      pastOcularHistory: "",
      ocularSurgeryDone: false,
      ocularSurgeryDate: "",
      generalHistory: "",
      eyesChecked: false,
      glassPrescription: "",
      glassPrescriptionSince: "",
      glassPrescriptionType: ""
    },
    examinations: {
      unaidedDistance: "",
      aidedDistance: "",
      pinhole: "",
      unaidedNearVision: "",
      aidedNearVision: "",
      retinoscopyOD: "",
      retinoscopyOS: "",
      torchLightExaminationOD: "",
      torchLightExaminationOS: "",
      eomOD: "",
      eomOS: "",
      colourVisionOD: "",
      colourVisionOS: ""
    },
    prescription: {
      userID: 1,
      sphereOD: 0,
      sphereOS: 0,
      cylinderOD: 0,
      cylinderOS: 0,
      axisOD: 0,
      axisOS: 0,
      dbcvaOD: 6,
      dbcvaOS: 6,
      addOD: 0,
      addOS: 0,
      nbcvaOD: 6,
      nbcvaOS: 6
    },
    additionalInformation: {
      remarks: "",
      ipdOD: 0,
      ipdOS: 0,
      frameSize: "",
      optometristSignature: ""
    }
  });

  const handleInputChange = (e, section, field) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'file') {
      setFormData(prevData => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [name]: files[0]
        }
      }));
    } else if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [name]: checked
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [name]: value
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    // Append text data to FormData
    for (let section in formData) {
      for (let field in formData[section]) {
        const value = formData[section][field];
        if (typeof value === 'object' && value !== null && value.name) {
          // If the value is a file, append it
          formDataToSubmit.append(field, value);
        } else {
          formDataToSubmit.append(`${section}[${field}]`, value);
        }
      }
    }

    try {
        const response = await fetch(`http://62.72.29.180/api/v1/auth/entries?user=${sessionStorage.getItem("userId")}`, {
        method: 'POST',
        body: formDataToSubmit // Send FormData directly
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        toast.success('Data inserted successfully!', {
          position: "top-center",
          autoClose: 3000,
        });
        setFormData({
            personalInformation: {
              name: "",
              age: "",
              region: "",
              motherTongue: "",
              religion: "",
              community: "",
              educationQualification: "",
              economicStatus: "",
              fatherName: "",
              spouseName: "",
              residentialAddress: "",
              occupation: "",
              yearsOfExperience: 0,
              state: "",
              district: "",
              contactNo: "",
              aadharCard: null,
              drivingLicense: null
            },
            employmentAndInsurance: {
              presentlyWorkingDetails: "",
              hasInsurance: false,
              facedAccident: false,
              enrolledInWelfareBoard: false,
              welfareBoardBenefits: ""
            },
            healthAndMedicalHistory: {
              hasHealthIssues: false,
              healthIssuesDescription: "",
              underMedication: false,
              eyeScreeningDone: false,
              eyeDefectsIdentified: ""
            },
            trainingAndAwareness: {
              attendedSoftSkillTraining: false,
              trainingDetails: "",
              awareOfRoadSafety: false
            },
            medicalAndOcularHistory: {
              pastOcularHistory: "",
              ocularSurgeryDone: false,
              ocularSurgeryDate: "",
              generalHistory: "",
              eyesChecked: false,
              glassPrescription: "",
              glassPrescriptionSince: "",
              glassPrescriptionType: ""
            },
            examinations: {
              unaidedDistance: "",
              aidedDistance: "",
              pinhole: "",
              unaidedNearVision: "",
              aidedNearVision: "",
              retinoscopyOD: "",
              retinoscopyOS: "",
              torchLightExaminationOD: "",
              torchLightExaminationOS: "",
              eomOD: "",
              eomOS: "",
              colourVisionOD: "",
              colourVisionOS: ""
            },
            prescription: {
              userID: 1,
              sphereOD: 0,
              sphereOS: 0,
              cylinderOD: 0,
              cylinderOS: 0,
              axisOD: 0,
              axisOS: 0,
              dbcvaOD: 6,
              dbcvaOS: 6,
              addOD: 0,
              addOS: 0,
              nbcvaOD: 6,
              nbcvaOS: 6
            },
            additionalInformation: {
              remarks: "",
              ipdOD: 0,
              ipdOS: 0,
              frameSize: "",
              optometristSignature: ""
            }
          })
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || 'Error submitting data', {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('Network error, please try again later.', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const renderSectionFields = (section, sectionName) => {
    return Object.keys(formData[section]).map((key) => {
      if (key === 'aadharCard' || key === 'drivingLicense') {
        return null; // Skipping file upload fields here as handled separately
      }

      const value = formData[section][key];
      const isBoolean = typeof value === 'boolean';
      const isNumber = typeof value === 'number';
      const isString = typeof value === 'string';

      return (
        <div key={key} className="space-y-2">
          <label htmlFor={key} className="block text-sm font-medium text-gray-700">
            {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
          </label>

          {/* Render based on data type */}
          {isString && (
            <input
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={(e) => handleInputChange(e, sectionName, key)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          )}

          {isNumber && (
            <input
              type="number"
              id={key}
              name={key}
              value={value}
              onChange={(e) => handleInputChange(e, sectionName, key)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          )}

          {isBoolean && (
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={value}
              onChange={(e) => handleInputChange(e, sectionName, key)}
              className="mt-1"
            />
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            {renderSectionFields('personalInformation', 'personalInformation')}

{/* File Uploads */}
<div className="space-y-4 mt-4">
  <div>
    <label htmlFor="aadharCard" className="block text-sm font-medium text-gray-700">Aadhar Upload</label>
    <input
      type="file"
      accept="image/*"
      capture="user"
      id="aadharCard"
      name="aadharCard"
      onChange={(e) => handleInputChange(e, 'personalInformation')}
      className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 file:bg-indigo-50 file:border-0 file:px-4 file:py-2 file:rounded-md file:text-indigo-700 hover:file:bg-indigo-100"
    />
  </div>

  <div>
    <label htmlFor="drivingLicense" className="block text-sm font-medium text-gray-700">Prescription Upload</label>
    <input
      type="file"
      id="drivingLicense"
      name="drivingLicense"
      onChange={(e) => handleInputChange(e, 'personalInformation')}
      className="mt-2 block w-full text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 file:bg-indigo-50 file:border-0 file:px-4 file:py-2 file:rounded-md file:text-indigo-700 hover:file:bg-indigo-100"
    />
  </div>
</div>
          </div>

          {/* Employment and Insurance */}
          <div className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Employment and Insurance</h2>
            {renderSectionFields('employmentAndInsurance', 'employmentAndInsurance')}
          </div>

          {/* Health and Medical History */}
          <div className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Health and Medical History</h2>
            {renderSectionFields('healthAndMedicalHistory', 'healthAndMedicalHistory')}
          </div>

          {/* Training and Awareness */}
          <div className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Training and Awareness</h2>
            {renderSectionFields('trainingAndAwareness', 'trainingAndAwareness')}
          </div>

          {/* Medical and Ocular History */}
          <div className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Medical and Ocular History</h2>
            {renderSectionFields('medicalAndOcularHistory', 'medicalAndOcularHistory')}
          </div>

          {/* Examinations */}
          <div className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Examinations</h2>
            {renderSectionFields('examinations', 'examinations')}
          </div>

          {/* Prescription */}
          <div className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Prescription</h2>
            {renderSectionFields('prescription', 'prescription')}
          </div>

          {/* Additional Information */}
          <div className="space-y-4 mt-6">
            <h2 className="text-xl font-semibold">Additional Information</h2>
            {renderSectionFields('additionalInformation', 'additionalInformation')}
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Submit
            </button>
          </div>
        </form>
      </div>
       {/* Toast Container */}
       <ToastContainer />
    </>
  );
};

export default EntryForm;
