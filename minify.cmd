@ECHO OFF
cd %1
for /R %%f in (*.js) do (
    terser %%f -o %%f  --compress --keep-classnames --keep-fnames --comments false
)

@REM for /R %%f in (*.js) do del /f %%f