import { useEffect, useState } from 'react';

/* React useEffect documentation (awesome): https://react.dev/reference/react/useEffect#usage 

  useEffect is another React hook that we use to execute logic outside of React's responsibility,
   *while* being able to synchronise it with events occurring in the component lifecycle, such as:
    - when a certain (monitored) value changes
    - when the page initially loads
    - whenever the component re-renders

  useEffect hooks fire *after* all other initial rendering is done.

  useEffect is being employed *responsibly* usually when we need to engage with an external system
  such as e.g. local/sessionStorage, a REST API, another data backend, or HTTP connections (e.g. chatroom).

  The general pattern is:
*/
function myComponent() {
  useEffect(
    () => { },  // param 1: some callback function whatever logic will fire
    []          // param 2: a dependency array (optional): controls *when* the effect fires
  )
}


// --------------------------------------------------------------------------------------------------------


/* A. param 1: the logic that fires inside the effect

  The callback function can also contain 'setup' and 'teardown/cleanup' code.
   The immediate logic is 'setup code', and whatever we *return* is a 'cleanup' callback.

   This is similar to connectedCallback vs. disconnectedCallback in non-framework web components.

   As the React docs also explain (with colour-coding), the order of operations is:
   - setup logic fires when component mounts
   - if we re-fire the effect (governed by dependency array, aka param2), then:
      - first, the 'cleanup' logic (nested return callback) fires with old state/props
      - then, the 'setup' logic fires again with new state/props
*/
function myComponentWithCleanup() {
  // param 1: callback with cleanup behaviour
  useEffect(
    () => {
      console.log('this is my setup logic; it will fire when the component mounts, and when effect re-fires')

      return () => {
        console.log('this nested callback is my cleanup logic; it fires on unmount & when effect re-fires')
      };
    },
    // param 2: my dependency array, controls when something fires
    []
  )
}


// --------------------------------------------------------------------------------------------------------



/* B. param 2: the dependency array

   As hinted all the way at the top when I began explaining useEffect, dependency array can take three 'forms':
   - no 2nd param at all             -> effect fires whenever component re-renders
   - [] empty dependency array       -> effect fires when component mounts (teardown fires on unmount)
   - [variables, inDependencyArray]  -> effect fires on load, AND teardown(oldData)->setup(newData) fires if variable val changes
*/

// B.1 - no dependency array (no 2nd arg)
function effectOnAnyRerender() {
  useEffect(
    // param 1: whatever I'm firing as logic 
    () => {
      console.log('setup logic');
      return () => {
        console.log('cleanup/teardown callback')
      };
    },
    // param 2 (dependency array) — completely missing
    // If there is no 2nd param, effect will fire *whenever* component re-renders 
  )
}


// B.2 - empty dependency array []
function effectOnLoad() {
  useEffect(
    // param 1: whatever I'm firing as logic 
    () => {
      console.log('setup logic');
      return () => {
        console.log('cleanup/teardown callback')
      };
    },
    // param 2 (dependency array) — empty array []
    [], // will fire only on compnent mount (will never re-fire)
        // teardown callback would only fire if/when component unmounts
  )
}


// B.3 - props or state variable in dependency array
//       I'll be showing *both* props and state here, but it's the same with only either/or
function effectOnVariableChange({ someProp }) {

  const [value, setValue] = useState(null);

  useEffect(
    // param 1: whatever I'm firing as logic 
    () => {
      console.log('setup logic');
      return () => {
        console.log('cleanup/teardown callback')
      };
    },
    /* param 2 (dependency array) — state variable or prop
        -> This will fire:
            a) when page loads, after all other rendering
            b) whenever *either* someProp *or* value changes (could've just used one)
               - first, the teardown function (if it exists) fires with old state/props
               - then,  the setup logic fires with new state/props
    */
    [someProp, value],
  )
}


// --------------------------------------------------------------------------------------------------------


/* Concrete example: HTTP connection for a chatroom component.

   NOTE: If I'm just e.g. fetching API data on load, I could just

    useEffect(
      fetch('myURL'),
      []
    )
  
  And I don't *need* any teardown behaviour for that effect.

  Let's look at a case where we have ongoing or persistent stuff we'll
  need to clean up (similar to mindfully removing event listeners on unmount):
*/

// To start with: we're passing a prop roomId, and also creating a stateful serverUrl
function ChatRoom({ roomId }) {

  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  // Here's our useEffect; in the component lifecycle, it'll fire after all other rendering.
  useEffect(
    // param 1: the 'actual effect', a.k.a. callback logic
    () => {
      // 1.a) the setup logic — fires when component mounts, or with new props/state after teardown if re-firing
      const connection = createConnection(serverUrl, roomId);
      connection.connect();
      // 2.a) the teardown/cleanup logic — fires when component unmounts, or immediately on re-render with old props/state
      return () => {
        connection.disconnect();
      };
    },
    // param 2: dependency array — dictates that effect re-fires anytime serverUrl or roomId changes
    [serverUrl, roomId]);
  // ...
}