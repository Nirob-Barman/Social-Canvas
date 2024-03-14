import Swal from 'sweetalert2';

const useSweetAlert = () => {

    const showUserCreatedSuccessAlert = () => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User created successfully. Check your email to activate your account.',
            showConfirmButton: false,
            timer: 5000,
        });
    };

    const showLoginSuccessAlert = () => {
        Swal.fire({
            title: 'User Login Successful.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
            },
        });
    };

    return {
        showUserCreatedSuccessAlert,
        showLoginSuccessAlert
    };
};

export default useSweetAlert;