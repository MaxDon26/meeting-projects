import httpService from "./http.service";

const todosEndpoint = "todos/";

const todosService = {
  get: async (completed) => {
    const { data } = await httpService.get(todosEndpoint, {
      params: completed !== null && {
        orderBy: '"completed"',
        equalTo: completed,
      },
    });

    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(todosEndpoint + payload.id, payload);

    return data;
  },
  update: async (payload) => {
    console.log(payload);
    const { data } = await httpService.patch(
      todosEndpoint + payload.id,
      payload
    );

    return data;
  },
};

export default todosService;
