import Toast from 'react-bootstrap/Toast';

function SuccessToast({userData}) {
  return (
    <Toast>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello,{userData.data.name} successfully Registerd.</Toast.Body>
    </Toast>
  );
}

export default SuccessToast;