import { Resource, component$, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { db } from "../db";
import { Person } from "~/components/contacts/person";

export const useContacts = routeLoader$(async () => {
  return await Promise.resolve(db);
});

export default component$(() => {

  const contacts = useContacts();
  const filter = useSignal("");

  return (
    <div>
      <h1 class="text-4xl font-semibold">Contacts</h1>
      <input
        onInput$={(e) => filter.value = (e.target as HTMLInputElement).value}
        type="search"
        class="mt-12 p-3 border w-full border-gray-400 rounded text-sm"
        placeholder="Search..."
      />
      {filter.value && <p class="italic text-sm mt-2">You've searched for <span class="font-semibold">{filter.value}</span></p>}
      <div class="mt-8">
        <Resource
          value={contacts}
          onPending={() => <div>Loading...</div>}
          onResolved={(contacts) => {
            return (
              <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {contacts.filter(c => c.name.toLowerCase().indexOf(filter.value.toLowerCase()) > -1).map(contact => (
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