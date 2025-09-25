import { useEffect } from 'react';
import Toast from 'react-native-toast-message';

export function useToastOnErrorOrOffline(error: string | null, isOffline: boolean) {
    useEffect(() => {
        if (error) {
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: error,
            position: 'top',
          })
        } else if (isOffline) {
          Toast.show({
            type: 'info',
            text1: 'Offline',
            text2: 'Você está offline. Por favor, verifique sua conexão com a internet.',
            position: 'top',
          })
        }
      }, [error, isOffline]);
}