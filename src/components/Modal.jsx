import React, { useState } from "react";
import "../App.css";
import axios from "axios";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const Modal = ({ closeModal }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]); // Holds the added schemas
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions); // Holds the unselected schemas
  const [currentSchema, setCurrentSchema] = useState(""); // Holds the value of the dropdown

  // Add the selected schema to the list
  const addSchema = () => {
    const selectedOption = availableSchemas.find(
      (s) => s.value === currentSchema
    );
    if (selectedOption) {
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setAvailableSchemas(
        availableSchemas.filter((s) => s.value !== currentSchema)
      );
      setCurrentSchema(""); // Reset the "Add schema to segment" dropdown
    }
  };

  // Update the schema when a dropdown in the blue box is changed
  const handleSchemaChange = (index, newValue) => {
    const newSchema = availableSchemas.find((s) => s.value === newValue);
    const updatedSchemas = [...selectedSchemas];
    updatedSchemas[index] = newSchema;

    // Update selected and available schemas
    setSelectedSchemas(updatedSchemas);
    const updatedAvailableSchemas = schemaOptions.filter(
      (option) => !updatedSchemas.some((s) => s.value === option.value)
    );
    setAvailableSchemas(updatedAvailableSchemas);
  };

  // Submit the data
  const handleSubmit = async () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((s) => ({ [s.value]: s.label })),
    };

    const webhookUrl =
      "https://webhook.site/a2509096-c7a0-47d3-bbbc-2f93d8b69bd4";

    try {
      await axios.post(webhookUrl, data);
      alert("Segment saved successfully!");
    } catch (error) {
      console.error("Error saving segment:", error);
    }

    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Saving Segment</h3>
        <input
          type="text"
          placeholder="Name of the segment"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />

        <div className={selectedSchemas.length > 0 ? "schema-box" : ""}>
          {selectedSchemas.map((schema, index) => (
            <div key={index} className="schema-item">
              <select
                value={schema.value}
                onChange={(e) => handleSchemaChange(index, e.target.value)}
              >
                {schemaOptions
                  .filter(
                    (option) =>
                      !selectedSchemas.some((s) => s.value === option.value) ||
                      option.value === schema.value
                  )
                  .map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </div>

        {/* Dropdown to select new schema */}
        <select
          value={currentSchema}
          onChange={(e) => setCurrentSchema(e.target.value)}
        >
          <option value="">Add schema to segment</option>
          {availableSchemas.map((schema) => (
            <option key={schema.value} value={schema.value}>
              {schema.label}
            </option>
          ))}
        </select>

        {/* +Add new schema button */}
        <button onClick={addSchema} disabled={!currentSchema}>
          +Add new schema
        </button>

        {/* Save and Cancel buttons */}
        <button onClick={handleSubmit}>Save the Segment</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;
