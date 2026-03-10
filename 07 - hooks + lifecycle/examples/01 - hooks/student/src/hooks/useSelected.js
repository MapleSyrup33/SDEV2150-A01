const STORAGE_KEY = 'selectedResource';
import { useState } from "react";
/**
 * This will be a custom hook built around useState.
 */
export function useSelectedResource() {
    const [selectedResource, setSelectecResource] = useState(() => {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored){
            try{
                return JSON.parse(stored);
            } catch {
                return null;
            }
        }
        return null;
    });

    function updateSelectedResource(resource) {
        setSelectecResource(resource);

        if(resource == null) {
            sessionStorage.removeItem(STORAGE_KEY);
        } else {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(resource));
        }
    }
    return [selectedResource, updateSelectedResource];
}