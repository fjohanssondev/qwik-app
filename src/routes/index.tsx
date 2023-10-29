import { Resource, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { db } from "../db";
import { Person } from "~/components/contacts/person";

export const useContacts = routeLoader$(async () => {
  return await Promise.resolve(db);
});

export default component$(() => {

  const contacts = useContacts();

  return (
    <div>
      <h1 class="text-4xl font-semibold">Contacts</h1>
      <div class="mt-4">
        <Resource
          value={contacts}
          onPending={() => <div>Loading...</div>}
          onResolved={(contacts) => {
            return (
              <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {contacts.map(contact => (
                  <li key={contact.id}>
                    <Person {...contact} />
                  </li>
                ))}
              </ul>
            )
          }}
          onRejected={(error) => <div>Error: {error}</div>}
        />
      </div>
    </div>
  )
})