pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
    }

    stages {

        stage('dev') {
            agent {
                docker {
                    image 'governmentpaas/cf-cli'
                    args '-u root'
                }
            }

            environment {
                CLOUDFOUNDRY_API = credentials('CLOUDFOUNDRY_API')
                CF_DOMAIN = credentials('CF_DOMAIN')
                CF_USER = credentials('CF_USER')
            }
            steps {
                git(url: 'https://github.com/ONSdigital/ras-backstage-ui.git', branch: 'jenkins-pipeline')
                sh 'build.sh'
                sh "cf login -a https://${env.CLOUDFOUNDRY_API} --skip-ssl-validation -u ${CF_USER_USR} -p ${CF_USER_PSW} -o rmras -s dev"
                sh 'cf push --no-start ras-backstage-dev'
                sh 'cf set-env ras-backstage-dev ONS_ENV dev'
                sh 'cf start ras-backstage-dev'
            }
        }

        stage('ci?') {
            agent none
            steps {
                script {
                    try {
                        timeout(time: 60, unit: 'SECONDS') {
                            script {
                                env.deploy_ci = input message: 'Deploy to CI?', id: 'deploy_ci', parameters: [choice(name: 'Deploy to CI', choices: 'no\nyes', description: 'Choose "yes" if you want to deploy to CI')]
                            }
                        }
                    } catch (ignored) {
                        echo 'Skipping ci deployment'
                    }
                }
            }
        }

        stage('ci') {
            agent {
                docker {
                    image 'governmentpaas/cf-cli'
                    args '-u root'
                }

            }
            when {
                environment name: 'deploy_ci', value: 'yes'
            }

            environment {
                CLOUDFOUNDRY_API = credentials('CLOUDFOUNDRY_API')
                CF_DOMAIN = credentials('CF_DOMAIN')
                CF_USER = credentials('CF_USER')
            }
            steps {
                sh 'build.sh'
                sh "cf login -a https://${env.CLOUDFOUNDRY_API} --skip-ssl-validation -u ${CF_USER_USR} -p ${CF_USER_PSW} -o rmras -s ci"
                sh 'cf push --no-start ras-backstage-ci'
                sh 'cf set-env ras-backstage-test ONS_ENV ci'
                sh 'cf start ras-backstage-ci'
            }
        }

        stage('test?') {
            agent none
            steps {
                script {
                    try {
                        timeout(time: 60, unit: 'SECONDS') {
                            script {
                                env.deploy_test = input message: 'Deploy to test?', id: 'deploy_test', parameters: [choice(name: 'Deploy to test', choices: 'no\nyes', description: 'Choose "yes" if you want to deploy to test')]
                            }
                        }
                    } catch (ignored) {
                        echo 'Skipping test deployment'
                    }
                }
            }
        }

        stage('test') {
            agent {
                docker {
                    image 'governmentpaas/cf-cli'
                    args '-u root'
                }

            }
            when {
                environment name: 'deploy_test', value: 'yes'
            }

            environment {
                CLOUDFOUNDRY_API = credentials('CLOUDFOUNDRY_API')
                CF_DOMAIN = credentials('CF_DOMAIN')
                TEST_SECURITY = credentials('TEST_SECURITY')
                CF_USER = credentials('CF_USER')
            }
            steps {
                sh 'build.sh'
                sh "cf login -a https://${env.CLOUDFOUNDRY_API} --skip-ssl-validation -u ${CF_USER_USR} -p ${CF_USER_PSW} -o rmras -s test"
                sh 'cf push --no-start ras-backstage-test'
                sh 'cf set-env ras-backstage-test ONS_ENV test'
                sh 'cf start ras-backstage-test'
            }
        }
    }

    post {
        always {
            cleanWs()
            dir('${env.WORKSPACE}@tmp') {
                deleteDir()
            }
            dir('${env.WORKSPACE}@script') {
                deleteDir()
            }
            dir('${env.WORKSPACE}@script@tmp') {
                deleteDir()
            }
        }
    }
}