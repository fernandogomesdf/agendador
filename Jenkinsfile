pipeline {
  agent { docker { image 'node:12' } }
  environment {
      CI = 'true' 
  }
  stages {
    stage('contrução') {
      steps {
        sh 'npm install'
      }
    }
  }
}
