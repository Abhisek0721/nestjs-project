import { Injectable } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { createReadStream, createWriteStream } from 'fs';
import * as crypto from 'crypto';
import * as path from "path";


interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

@Injectable()
export class UserService {
  private readonly mongoClient: MongoClient;

  constructor() {
    // Initialize the MongoDB connection
    this.mongoClient = new MongoClient('mongodb+srv://authenticatorAbhi:authenticatorAbhi2001@cluster0.rm1wmo7.mongodb.net/authenticator');
    this.mongoClient.connect();
  }

  async createUser(inputData:IUser) {
    // TODO: Store the user entry in the database
    await this.mongoClient.db('authenticator')
          .collection('users')
          .insertOne(inputData);
    return {
      success: true,
      message: "new user added!"
    };
  }

  async getUser(userId: string) {
    const user = { _id: new ObjectId(userId) };
    const fetchUserData = await this.mongoClient.db('authenticator')
                                    .collection('users')
                                    .findOne(user);
    return fetchUserData;
  }

  async getAvatar(userId: string) {
    // TODO: Retrieve the image by 'avatar' URL
    // On the first request, save the image as a plain file
    // stored as a MongoDB entry with userId and hash
    // Return its base64-encoded representation
    // On following requests, return the previously saved file in base64-encoded representation (retrieve from the database)
    const user = await this.mongoClient.db('authenticator').collection('users').findOne({ _id: new ObjectId(userId) });
    if (user.avatar) {
      // File already exists, retrieve and return it
      const avatarData = await this.mongoClient.db('authenticator').collection('avatars').findOne({ userId });
      return avatarData.data;
    } else {
      // File doesn't exist, save and return it
      const imageUrl = 'https://camo.githubusercontent.com/48de7555a999bbce6ec737fe05c8b43f37c5e0ec181cfe54722b435109622055/68747470733a2f2f692e6962622e636f2f6a486e32325a4c2f53637265656e73686f742d323032332d30352d30312d3137323534342e706e67';
      const avatarHash = crypto.createHash('md5').update(imageUrl).digest('hex');
      const avatarPath = path.join(__dirname, `../../path/to/avatar/${avatarHash}.jpg`);

      const avatarReadStream = createReadStream(avatarPath);
      const avatarBuffer = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        avatarReadStream.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });
        avatarReadStream.on('end', () => {
          resolve(Buffer.concat(chunks));
        });
        avatarReadStream.on('error', (error: Error) => {
          reject(error);
        });
      });

      const avatarData = {
        userId,
        data: avatarBuffer.toString('base64'),
      };

      await this.mongoClient.db('authenticator').collection('avatars').insertOne(avatarData);
      return avatarData.data;
    }
  }

  async deleteAvatar(userId: string) {
    // TODO: Remove the file from the FileSystem storage
    // Remove the stored entry from the database
    await this.mongoClient.db('authenticator').collection('avatars').deleteOne({ userId });
    return {
      success: true,
      message: "avatar is deleted!"
    };
  }
}
