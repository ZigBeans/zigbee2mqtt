const devices = require('zigbee-shepherd-converters').devices;
const HomeassistantExtension = require('../lib/extension/homeassistant');
const sinon = require('sinon');
const settings = require('../lib/util/settings');

const WSDCGQ11LM = devices.find((d) => d.model === 'WSDCGQ11LM');
const SV01 = devices.find((d) => d.model === 'SV01');

describe('HomeAssistant extension', () => {
    let homeassistant = null;
    let mqtt = null;

    beforeEach(() => {
        mqtt = {
            publish: sinon.spy(),
        };

        homeassistant = new HomeassistantExtension(null, mqtt, null, null);
        homeassistant.zigbee2mqttVersion = 'test';
    });

    afterEach(() => {
        sinon.restore();
    });

    it('Should have mapping for all devices supported by zigbee-shepherd-converters', () => {
        const missing = [];

        devices.forEach((d) => {
            if (!homeassistant._getMapping()[d.model]) {
                missing.push(d.model);
            }
        });

        expect(missing).toHaveLength(0);
    }
    );

    it('Should discover devices', () => {
        let payload = null;
        sinon.stub(settings, 'getDevice').callsFake(() => {
            return {friendly_name: 'my_device'};
        });

        homeassistant.discover('0x12345678', WSDCGQ11LM, false);
        expect(mqtt.publish.callCount).toEqual(5);

        // 1
        payload = {
            'unit_of_measurement': '°C',
            'device_class': 'temperature',
            'value_template': '{{ value_json.temperature }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_temperature',
            'unique_id': '0x12345678_temperature_zigbee2mqtt',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(0).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(0).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(0).args[3]).toBeNull();
        expect(mqtt.publish.getCall(0).args[4]).toEqual('homeassistant');

        // 2
        payload = {
            'unit_of_measurement': '%',
            'device_class': 'humidity',
            'value_template': '{{ value_json.humidity }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_humidity',
            'unique_id': '0x12345678_humidity_zigbee2mqtt',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(1).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(1).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(1).args[3]).toBeNull();
        expect(mqtt.publish.getCall(1).args[4]).toEqual('homeassistant');

        // 3
        payload = {
            'unit_of_measurement': 'hPa',
            'device_class': 'pressure',
            'value_template': '{{ value_json.pressure }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_pressure',
            'unique_id': '0x12345678_pressure_zigbee2mqtt',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(2).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(2).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(2).args[3]).toBeNull();
        expect(mqtt.publish.getCall(2).args[4]).toEqual('homeassistant');

        // 4
        payload = {
            'unit_of_measurement': '%',
            'device_class': 'battery',
            'value_template': '{{ value_json.battery }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_battery',
            'unique_id': '0x12345678_battery_zigbee2mqtt',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(3).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(3).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(3).args[3]).toBeNull();
        expect(mqtt.publish.getCall(3).args[4]).toEqual('homeassistant');

        // 5
        payload = {
            'unit_of_measurement': '-',
            'value_template': '{{ value_json.linkquality }}',
            'state_topic': 'zigbee2mqtt/my_device',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_linkquality',
            'unique_id': '0x12345678_linkquality_zigbee2mqtt',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(4).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(4).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(4).args[3]).toBeNull();
        expect(mqtt.publish.getCall(4).args[4]).toEqual('homeassistant');
    });

    it('Should discover devices with precision', () => {
        let payload = null;
        sinon.stub(settings, 'getDevice').callsFake(() => {
            return {
                friendly_name: 'my_device',
                humidity_precision: 0,
                temperature_precision: 1,
                pressure_precision: 2,
            };
        });

        homeassistant.discover('0x12345678', WSDCGQ11LM, false);
        expect(mqtt.publish.callCount).toEqual(5);

        // 1
        payload = {
            'unit_of_measurement': '°C',
            'device_class': 'temperature',
            'value_template': '{{ (value_json.temperature | float) | round(1) }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_temperature',
            'unique_id': '0x12345678_temperature_zigbee2mqtt',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(0).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(0).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(0).args[3]).toBeNull();
        expect(mqtt.publish.getCall(0).args[4]).toEqual('homeassistant');

        // 2
        payload = {
            'unit_of_measurement': '%',
            'device_class': 'humidity',
            'value_template': '{{ (value_json.humidity | float) | round(0) }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_humidity',
            'unique_id': '0x12345678_humidity_zigbee2mqtt',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(1).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(1).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(1).args[3]).toBeNull();
        expect(mqtt.publish.getCall(1).args[4]).toEqual('homeassistant');

        // 3
        payload = {
            'unit_of_measurement': 'hPa',
            'device_class': 'pressure',
            'value_template': '{{ (value_json.pressure | float) | round(2) }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_pressure',
            'unique_id': '0x12345678_pressure_zigbee2mqtt',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(2).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(2).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(2).args[3]).toBeNull();
        expect(mqtt.publish.getCall(2).args[4]).toEqual('homeassistant');

        // 4
        payload = {
            'unit_of_measurement': '%',
            'device_class': 'battery',
            'value_template': '{{ value_json.battery }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_battery',
            'unique_id': '0x12345678_battery_zigbee2mqtt',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(3).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(3).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(3).args[3]).toBeNull();
        expect(mqtt.publish.getCall(3).args[4]).toEqual('homeassistant');

        // 5
        payload = {
            'unit_of_measurement': '-',
            'value_template': '{{ value_json.linkquality }}',
            'state_topic': 'zigbee2mqtt/my_device',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_linkquality',
            'unique_id': '0x12345678_linkquality_zigbee2mqtt',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(4).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(4).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(4).args[3]).toBeNull();
        expect(mqtt.publish.getCall(4).args[4]).toEqual('homeassistant');
    });

    it('Should discover devices with overriden user configuration', () => {
        let payload = null;
        sinon.stub(settings, 'getDevice').callsFake(() => {
            return {
                friendly_name: 'my_device',
                homeassistant: {
                    expire_after: 30,
                    icon: 'mdi:test',
                    temperature: {
                        expire_after: 90,
                    },
                },
            };
        });

        homeassistant.discover('0x12345678', WSDCGQ11LM, false);
        expect(mqtt.publish.callCount).toEqual(5);

        // 1
        payload = {
            'unit_of_measurement': '°C',
            'device_class': 'temperature',
            'value_template': '{{ value_json.temperature }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_temperature',
            'unique_id': '0x12345678_temperature_zigbee2mqtt',
            'expire_after': 90,
            'icon': 'mdi:test',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(0).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(0).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(0).args[3]).toBeNull();
        expect(mqtt.publish.getCall(0).args[4]).toEqual('homeassistant');

        // 2
        payload = {
            'unit_of_measurement': '%',
            'device_class': 'humidity',
            'value_template': '{{ value_json.humidity }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_humidity',
            'unique_id': '0x12345678_humidity_zigbee2mqtt',
            'expire_after': 30,
            'icon': 'mdi:test',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(1).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(1).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(1).args[3]).toBeNull();
        expect(mqtt.publish.getCall(1).args[4]).toEqual('homeassistant');

        // 3
        payload = {
            'unit_of_measurement': 'hPa',
            'device_class': 'pressure',
            'value_template': '{{ value_json.pressure }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_pressure',
            'unique_id': '0x12345678_pressure_zigbee2mqtt',
            'expire_after': 30,
            'icon': 'mdi:test',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(2).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(2).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(2).args[3]).toBeNull();
        expect(mqtt.publish.getCall(2).args[4]).toEqual('homeassistant');

        // 4
        payload = {
            'unit_of_measurement': '%',
            'device_class': 'battery',
            'value_template': '{{ value_json.battery }}',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'state_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_battery',
            'unique_id': '0x12345678_battery_zigbee2mqtt',
            'expire_after': 30,
            'icon': 'mdi:test',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(3).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(3).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(3).args[3]).toBeNull();
        expect(mqtt.publish.getCall(3).args[4]).toEqual('homeassistant');

        // 5
        payload = {
            'unit_of_measurement': '-',
            'value_template': '{{ value_json.linkquality }}',
            'state_topic': 'zigbee2mqtt/my_device',
            'json_attributes_topic': 'zigbee2mqtt/my_device',
            'name': 'my_device_linkquality',
            'unique_id': '0x12345678_linkquality_zigbee2mqtt',
            'expire_after': 30,
            'icon': 'mdi:test',
            'device': {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Aqara temperature, humidity and pressure sensor (WSDCGQ11LM)',
                'manufacturer': 'Xiaomi',
            },
            'availability_topic': 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(4).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(4).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(4).args[3]).toBeNull();
        expect(mqtt.publish.getCall(4).args[4]).toEqual('homeassistant');
    });

    it('Should discover devices with cover_position', () => {
        let payload = null;
        sinon.stub(settings, 'getDevice').callsFake(() => {
            return {friendly_name: 'my_device'};
        });

        homeassistant.discover('0x12345678', SV01, false);
        expect(mqtt.publish.callCount).toEqual(5);

        // 1
        payload = {
            name: 'my_device_cover',
            command_topic: 'zigbee2mqtt/my_device/set',
            position_topic: 'zigbee2mqtt/my_device',
            set_position_topic: 'zigbee2mqtt/my_device/set',
            set_position_template: '{ "position": {{ position }} }',
            value_template: '{{ value_json.position }}',
            unique_id: '0x12345678_cover_zigbee2mqtt',
            device: {
                'identifiers': 'zigbee2mqtt_0x12345678',
                'name': 'my_device',
                'sw_version': 'Zigbee2mqtt test',
                'model': 'Smart vent (SV01)',
                'manufacturer': 'Keen Home',
            },
            availability_topic: 'zigbee2mqtt/bridge/state',
        };

        expect(JSON.parse(mqtt.publish.getCall(0).args[1])).toEqual(payload);
        expect(mqtt.publish.getCall(0).args[2]).toEqual({retain: true, qos: 0});
        expect(mqtt.publish.getCall(0).args[3]).toBeNull();
        expect(mqtt.publish.getCall(0).args[4]).toEqual('homeassistant');
    });
});
