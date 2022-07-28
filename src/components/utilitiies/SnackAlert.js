import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import SnackMessage from './SnackMessage'

export default function SnackAlert() {
  const { enqueueSnackbar } = useSnackbar()
  const alert = useSelector((state) => state.common)
  if (alert.alertMessage != null) {
    enqueueSnackbar(alert.alertMessage, { variant: alert.alertType })
    enqueueSnackbar(null, {
      content: (key) => (
        <SnackMessage
          id={key}
          message={alert.alertMessage}
          variant={alert.alertType}
        />
      ),
    })
  }

  return null
}
