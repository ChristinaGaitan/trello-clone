import { useState } from 'react'
import { AddItemButton } from './styles'

type AddNewItemProps = {
    onAdd(text: string): void // callback function that will be called when we click the Create button
    toggleButtonText: string
    dark?: boolean
}

export const AddNewItem = (props: AddNewItemProps) => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const { onAdd, toggleButtonText, dark } = props;

    if (showForm) {
        // We show item creation from here
    }

    return (
        <AddItemButton $dark={dark} onClick={() => setShowForm(true)}>
            {toggleButtonText}
        </AddItemButton>
    )
}
