import { useState, useMemo, useEffect } from "react"
import merge from "lodash.merge"
import { interpret } from "xstate/lib/interpreter"

const useMachine = (machine, { context, ...config } = {}) => {
  const [state, setState] = useState(machine.initialState)
  const service = useMemo(
    () =>
      interpret(
        machine
          .withContext(merge({}, machine.context, context))
          .withConfig(config)
      ),
    []
  )

  useEffect(() => {
    service.onTransition(setState).start()
    return service.stop
  }, [])

  return [state, service.send]
}

export { default as AppMachine } from "./App";
export { default as ReleaseMachine } from "./Release";

export default useMachine
