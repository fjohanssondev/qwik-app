import { component$ } from "@builder.io/qwik"
import type { Contact } from "~/db"

export const Person = component$((props: Contact) => {
  return (
    <article class="bg-gray-100 p-4 shadow rounded flex gap-2">
      <img class="rounded-md" width={50} height={50} src={props.photo} />
      <div>
        <h2>{props.name}</h2>
        <p class="text-xs">{props.email}</p>
        <p class="font-bold text-xs">{props.company}</p>
      </div>
    </article>
  )
})