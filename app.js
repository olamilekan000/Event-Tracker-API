import app from './server/server'
import logger from './server/config/winston'
import PORT from './server/config/port'

app.listen(PORT, () => {
  logger.info(`Server now listening for requests at port ${PORT}`);
});
