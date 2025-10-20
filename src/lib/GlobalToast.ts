import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-right",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
  showCloseButton: true,
});

export const GlobalToast = (
  icon: "success" | "error" | "info" | "question" | "warning",
  title: string
) =>
  Toast.fire({
    icon,
    title,
  });
