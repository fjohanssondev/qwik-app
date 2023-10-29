import { Resource, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { db } from "../db";

export const useContacts = routeLoader$(async () => {
  return await Promise.resolve(db);
});

export default component$(() => {

  const contacts = useContacts();

  return (
    <div>
      <h1>Contacts</h1>
      <Resource
        value={contacts}
        onPending={() => <div>Loading...</div>}
        onResolved={(contacts) => {
          return <ul>
            {contacts.map(contact => (
              <li key={contact.id}>{contact.name}</li>
            ))}
          </ul>
        }}
        onRejected={(error) => <div>Error: {error}</div>}
      />
    </div>
  )
})