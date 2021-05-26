import React, { useCallback } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Publish from "@material-ui/icons/Publish";
import { useTranslation, CardMedia, Grid, IconButton, Paper } from "@apisuite/fe-base";
import useStyles from "./styles";
import { MediaProps } from "./types";

export const MediaUpload: React.FC<MediaProps> = ({
  onFileLoaded,
  onDeletePressed,
  images = [],
  accept = "image/*",
  helperText,
}) => {
  const classes = useStyles();
  const [t] = useTranslation();

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      onFileLoaded(acceptedFiles);
    }
  }, [onFileLoaded]);

  const {
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: accept, onDrop, maxSize: 2000000 });

  const files = () => {
    return images.map((url: string, index: number) => (
      <Grid key={`app-image-${index}`} item xs={3}>
        <Paper variant="outlined" className={classes.media}>
          <CardMedia
            className={classes.mediaImg}
            component="img"
            image={url}
            height={130}
          />
          <IconButton onClick={() => onDeletePressed(url)}>
            <DeleteForever />
          </IconButton>
        </Paper>
      </Grid>
    ));
  };

  const rejectedFilesErrors = fileRejections.map(({ file, errors }) => (
    <div className={classes.mediaError} key={file.name}>
      {file.name}
      <div>
        {errors.map(e => (
          <span key={e.code}>{e.message}</span>
        ))}
      </div>
    </div>
  ));

  return (
    <>
      <fieldset className={clsx(
        classes.mediaContainer,
        isDragActive && classes.activeStyle,
        isDragAccept && classes.acceptStyle,
        isDragReject && classes.rejectStyle,
      )}>
        <legend>{t("mediaUpload.legend")}</legend>
        <Grid container direction="row" justify="space-between" alignItems="center" spacing={3}>
          <div className={clsx(classes.media, classes.mediaUpload)} {...getRootProps()}>
            <input {...getInputProps()} />
            <Publish fontSize="large" className={classes.mediaIcon} />
            <p>{t("mediaUpload.dragdrop")}</p>
          </div>
          {files()}
          <Grid item xs={12}>
            {rejectedFilesErrors}
          </Grid>
        </Grid>
      </fieldset>
      <p className={classes.helperText}>{helperText || t("mediaUpload.helperText")}</p>
    </>
  );
};
