import { useEffect } from 'react';

export function useOutsideClick(modalRef, bellRef, onOutsideClick, showNotifications) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (showNotifications && modalRef.current && !modalRef.current.contains(event.target) && bellRef.current && !bellRef.current.contains(event.target)) {
                onOutsideClick();
            }
        }
        
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, bellRef, onOutsideClick, showNotifications]);
}
