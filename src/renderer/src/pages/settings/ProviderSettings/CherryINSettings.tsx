import { useProvider } from '@renderer/hooks/useProvider'
import { Select } from 'antd'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'

interface CherryINSettingsProps {
  providerId: string
  apiHost: string
  setApiHost: (host: string) => void
}

const API_HOST_OPTIONS = [
  {
    value: 'https://api.onechat.tools',
    labelKey: '自动优选线路',
    description: 'api.onechat.tools'
  },
  {
    value: 'https://jp.onechat.tools',
    labelKey: '日本线路',
    description: 'jp.onechat.tools'
  },
  {
    value: 'https://ncr.onechat.tools',
    labelKey: '南亚/西亚线路',
    description: 'ncr.onechat.tools'
  },
  {
    value: 'https://de.onechat.tools',
    labelKey: '欧洲线路',
    description: 'de.onechat.tools'
  }
]

const CherryINSettings: FC<CherryINSettingsProps> = ({ providerId, apiHost, setApiHost }) => {
  const { updateProvider } = useProvider(providerId)

  const getCurrentHost = useMemo(() => {
    const matchedOption = API_HOST_OPTIONS.find((option) => apiHost?.includes(option.value.replace('https://', '')))
    return matchedOption?.value ?? API_HOST_OPTIONS[0].value
  }, [apiHost])

  const handleHostChange = useCallback(
    (value: string) => {
      setApiHost(value)
      updateProvider({ apiHost: value, anthropicApiHost: value })
    },
    [setApiHost, updateProvider]
  )

  const options = useMemo(
    () =>
      API_HOST_OPTIONS.map((option) => ({
        value: option.value,
        label: (
          <div className="flex flex-col gap-0.5">
            <span>{option.labelKey}</span>
            <span className="text-[var(--color-text-3)] text-xs">{option.description}</span>
          </div>
        )
      })),
    []
  )

  return (
    <Select
      value={getCurrentHost}
      onChange={handleHostChange}
      options={options}
      style={{ width: '100%', marginTop: 5 }}
      optionLabelProp="label"
      labelRender={(option) => option.value}
    />
  )
}

export default CherryINSettings
