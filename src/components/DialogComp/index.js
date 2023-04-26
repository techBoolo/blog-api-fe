import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const DialogComp = (props) => {
  const { show, setShow, title, content, handleText1, handleText2, text1, text2 } = props

  return (
    <Dialog
      open={show}
      onClose={() => setShow(false)}
    >
      <DialogTitle><Typography variant='body1'>{title}</Typography></DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        <DialogActions>
          <Button onClick={handleText1}>{text1}</Button>
          <Button onClick={handleText2}>{text2}</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComp
