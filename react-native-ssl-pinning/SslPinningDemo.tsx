/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  Platform,
  TextInput,
  
} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import {getCookies, fetch, removeCookieByName} from 'react-native-ssl-pinning';
import FileSelector from '@react-native-oh-tpl/react-native-file-selector';

let filePath: string[] = []
function SslPingDemo() : React.JSX.Element{
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>fetch bY Public Key</Text>
              <Text style={styles.sectionDescription}>
                <Button
                  title="fetch"
                  onPress={() => {
                    fetch("https://jsnjlq.cn", {
                        method: "GET" ,
                        timeoutInterval: 10000, // milliseconds
                        pkPinning: true,
                        // your certificates array (needed only in android) ios will pick it automatically
                        sslPinning: {
                          certs: [
                            "sha256/seHAF9YGeG+3QCvsh2CnsC4dt3aw9I6tW6gSBZSUptI="
                          ]
                        },
                        headers: {
                          Accept: "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", "e_platform": "mobile",
                        }
                    }).then(
                      (result) => {
                        Alert.alert(JSON.stringify(result));
                      },
                    );
                  }}
                />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>fetch bY Certificate</Text>
              <Text style={styles.sectionDescription}>
                <Button
                  title="fetch"
                  onPress={() => {
                    fetch("https://jsnjlq.cn", {
                        method: "POST" ,
                        timeoutInterval: 10000, // milliseconds
                        sslPinning: {
                          certs: ["cert"]
                        },
                        headers: {
                          Accept: "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", "e_platform": "mobile",
                        }
                    }).then(response => {
                      Alert.alert(JSON.stringify(response));
                    })
                    .catch(err => {
                      console.log(`error: ${err}`)
                    })
                  }}
                />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <FileSelector
                onDone={(path: string[]) => {
                  filePath = path
                }}
                onCancel={() => {console.log("cancelled");}}
              />
              <Text style={styles.sectionTitle} >Multipart request</Text>
              <Text style={styles.sectionDescription}>
                <Button
                  title="fetch"
                  onPress={() => {
                      let formData = new FormData()
                      formData.append('username', 'Chris');
                      let filePathArray = filePath.length > 0 ?filePath[0].split("/") : ["test"]
                      formData.append('file', {
                        name: encodeURIComponent(filePathArray[filePathArray.length - 1]),
                        fileName: encodeURIComponent(filePathArray[filePathArray.length - 1]),
                        type: "multipart/form-data",
                        uri: filePath[0]
                      })
                      fetch("https://jsnjlq.cn/handerOkhttpRequest/parse", {
                        method: "POST" ,
                        timeoutInterval: 10000, // milliseconds
                        body: {
                          formData: formData,
                        },
                        pkPinning: true,
                        sslPinning: {
                          certs: [
                            "sha256/seHAF9YGeG+3QCvsh2CnsC4dt3aw9I6tW6gSBZSUptI="
                          ]
                        },
                        headers: {
                          "Content-Type": "multipart/form-data"
                        }
                      }).then(response => {
                        Alert.alert(JSON.stringify(response),response.bodyString);
                      })
                      .catch(err => {
                        console.log(`error: ${err}`)
                      })
                  }}
                />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>getCookies</Text>
              <Text style={styles.sectionDescription}>
                <Button
                  title="getCookies"
                  onPress={async () => {
                    getCookies("jsnjlq.cn").then(
                      (result) => {
                        Alert.alert(JSON.stringify(result));
                      },
                    );
                  }}
                />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>remove Cookie</Text>
              <Text style={styles.sectionDescription}>
                <Button
                  title="removeCookie"
                  onPress={async () => {
                    removeCookieByName("name").then(
                      (result) => {
                      },
                    );
                  }}
                />
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default SslPingDemo;