import { nanoid } from '@blockcode/utils';
import { useProjectContext, setAlert, delAlert, openPromptModal } from '@blockcode/core';
import { MPYUtils } from '@blockcode/board';

import { Spinner, Text, MenuSection, MenuItem } from '@blockcode/core';

let downloadAlertId = null;

const removeDownloading = () => {
  delAlert(downloadAlertId);
  downloadAlertId = null;
};

const downloadingAlert = (progress) => {
  if (!downloadAlertId) {
    downloadAlertId = nanoid();
  }
  if (progress < 100) {
    setAlert({
      id: downloadAlertId,
      icon: <Spinner level="success" />,
      message: (
        <Text
          id="arcade.alert.downloading"
          defaultMessage="Downloading...{progress}%"
          progress={progress}
        />
      ),
    });
  } else {
    setAlert('downloadCompleted', { id: downloadAlertId });
    setTimeout(removeDownloading, 2000);
  }
};

const errorAlert = (err) => {
  if (err === 'NotFoundError') return;
  setAlert('connectionError', 1000);
};

export function DeviceMenu({ itemClassName }) {
  const { key, files, assets } = useProjectContext();

  return (
    <>
      <MenuSection>
        <MenuItem
          disabled={downloadAlertId}
          className={itemClassName}
          label={
            <Text
              id="blocks.menu.device.download"
              defaultMessage="Download program"
            />
          }
          onClick={async () => {
            if (downloadAlertId) return;

            let currentDevice;
            try {
              currentDevice = await MPYUtils.connect([]);
            } catch (err) {
              errorAlert(err.name);
            }
            if (!currentDevice) return;

            const checker = MPYUtils.check(currentDevice).catch(() => {
              errorAlert();
              removeDownloading();
            });

            const projectFiles = [].concat(files.value, assets.value).map((file) => ({
              ...file,
              id: file.id.startsWith('lib/')
                ? file.id // 扩展的文件不放入项目文件夹
                : `proj${key.value}/${file.id}`,
            }));

            downloadingAlert(0);
            try {
              if (await MPYUtils.flashFree(currentDevice, projectFiles)) {
                await MPYUtils.write(currentDevice, projectFiles, downloadingAlert);
                await MPYUtils.config(currentDevice, {
                  'latest-project': key,
                });
                currentDevice.hardReset();
              } else {
                openPromptModal({
                  title: (
                    <Text
                      id="blocks.menu.device.name"
                      defaultMessage="device"
                    />
                  ),
                  label: (
                    <Text
                      id="blocks.alert.flashOutSpace"
                      defaultMessage="The flash is running out of space."
                    />
                  ),
                });
                removeDownloading();
              }
            } catch (err) {
              errorAlert(err.name);
              removeDownloading();
            } finally {
              checker.cancel();
            }
          }}
        />
      </MenuSection>
    </>
  );
}
