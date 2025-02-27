import { useTranslation } from 'next-i18next';
import React from 'react';

import { IconDelete, IconEdit } from '@components/uiKit/Icons';
import { ListItemAdornment } from '@components/uiKit/ListItemAdornment';
import { ListItemDivider } from '@components/uiKit/ListItemDivider';
import { ListItemText } from '@components/uiKit/ListItemText';
import { Menu } from '@components/uiKit/Menu';
import { MenuItem, TMenuItemProps } from '@components/uiKit/MenuItem';

import { TRANS } from '@components/utils/types';

export type TLayoutProps = Partial<TMenuItemProps> & {
  canModerate: boolean;
  onRemove?: () => void;
  hasRemoveItem?: boolean;
  hasEditItem?: boolean;
  onEdit?: () => void;
};

const Layout = React.forwardRef<any, TLayoutProps>((props, ref) => {
  const {
    canModerate,
    hasRemoveItem,
    onRemove,
    onClose,
    hasEditItem,
    onEdit,
    ...other
  } = props;

  const { t } = useTranslation(TRANS.MAIN);

  const renderEditItem = () => {
    if (hasEditItem) {
      return (
        <MenuItem
          isButton
          onClick={onEdit}
          onClose={onClose}
        >
          <ListItemAdornment>
            <IconEdit />
          </ListItemAdornment>

          <ListItemText>
            {t('kanbanBoardMenu.edit')}
          </ListItemText>
        </MenuItem>
      );
    }

    return null;
  };

  const renderRemoveItem = () => {
    if (hasRemoveItem) {
      return (
        <>
          <ListItemDivider />

          <MenuItem
            isButton
            onClick={onRemove}
            onClose={onClose}
          >
            <ListItemAdornment>
              <IconDelete
                fill="font.negative"
              />
            </ListItemAdornment>

            <ListItemText
              textProps={{
                color: 'font.negative',
              }}
            >
              {t('kanbanBoardMenu.delete')}
            </ListItemText>
          </MenuItem>
        </>
      );
    }

    return null;
  };

  const renderContent = () => {
    if (!canModerate) {
      return null;
    }

    return (
      <>
        {renderEditItem()}
        {renderRemoveItem()}
      </>
    );
  };

  return (
    <Menu
      ref={ref}
      {...other}
    >
      {renderContent()}
    </Menu>
  );
});

Layout.displayName = 'Layout';

export {
  Layout,
};
