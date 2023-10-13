import { useController } from "react-hook-form";
import { useState } from "react";

export default function FileUploadForm({ control }) {
    const {
        field: fileUploadField,
        fieldState: { isDirty: fileIsDirty },
        formState: { dirtyFields: fileDirtyFields },
    } = useController({
        name: "fileUpload", // Use the name parameter passed to the function
        control,
    });
    const handleFileChange = (e) => {
        const files = e.target.files;
        setSelectedFiles(files);
    };

    const [selectedFiles, setSelectedFiles] = useState([]);

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
            />
            {selectedFiles.length > 0 && (
                <div>
                    <p>Selected files:</p>
                    <ul>
                        {Array.from(selectedFiles).map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
