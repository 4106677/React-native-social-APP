import { TouchableOpacity } from 'react-native';
import LogOutIcon from '../../../components/svg/LogOutIcon';
import GridIcon from '../../../components/svg/GridIcon';
import authOperations from '../../../redux/auth/authOperations';
import { Ionicons, Feather } from '@expo/vector-icons';

export const getPosts = dispatch => ({
  title: 'Публікації',
  headerRight: props => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => dispatch(authOperations.authLogout())}
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}
      >
        <LogOutIcon {...props} />
      </TouchableOpacity>
    );
  },
  tabBarIcon: ({ color, size }) => <GridIcon color={color} size={size} />,
});
