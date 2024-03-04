import { toast } from "react-toastify";

const toastType = {
  info: toast.info,
  success: toast.success,
  warning: toast.warning,
  error: toast.error,
  loading: toast.loading,
};
let loadingToastId;

const showToast = ({message, options}) => {
  if (loadingToastId) {
    setTimeout(() => {
        toast.update(loadingToastId, {...options, autoClose: true})
    }, 3000);    
  } else {
    loadingToastId = toastType[options.type](message, options);
  }
  return loadingToastId;
};

const hideLoadingToast = () => {
  if (loadingToastId) {
    toast.dismiss(loadingToastId);
    loadingToastId = null;
  }
};

export { showToast, hideLoadingToast };
