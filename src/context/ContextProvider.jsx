import React, { createContext } from "react";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
  // const [ allMessages, setAllMessages ] = useState( [] );

  // useEffect( () => {
  //     socket.on( 'allMessages', ( data ) => {
  //         setAllMessages( data );
  //     } );
  // }, [] );

  // socket.on( "receive_msg", ( data ) => {
  //     setAllMessages( [ ...allMessages, data ] )
  // } );

  // const sendMessage = ( data ) => {
  //     socket.emit( 'send_msg', data )
  // }
  const asd = () => console.log("first");

  return (
    <Context.Provider
      value={
        {
          asd
          // allMessages,
          // sendMessage
        }
      }
    >
      {children}
    </Context.Provider>
  );
};
