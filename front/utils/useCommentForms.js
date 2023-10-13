import { useController } from "react-hook-form";

export default function useGetForms({ control }) {
    const {
        field: commentField,
        fieldState: { isDirty: commentIsDirty },
        formState: { dirtyFields: commentDirtyFields },
    } = useController({
        name: "comment",
        control,
    });
    return { commentField, commentIsDirty, commentDirtyFields };
}
